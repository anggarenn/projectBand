/**
 * QA Automation Script: Minang Rumah Gadang Luxury Verification
 * Captures Cover Screen and Opened Stage 2 Hero with Folk Invitation styling.
 */

const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

async function run() {
  const artifactsDir = path.join(__dirname, "../qa-artifacts");
  if (!fs.existsSync(artifactsDir)) {
    fs.mkdirSync(artifactsDir, { recursive: true });
  }

  const browser = await chromium.launch({
    headless: true,
    channel: "msedge",
  });

  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();
  page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));
  page.on("pageerror", (err) => console.log("PAGE ERROR:", err.message));
  page.on("response", (res) => {
    if (res.status() >= 400) console.log("HTTP ERROR:", res.status(), res.url());
  });

  const url = "http://localhost:3002/demo/motion-art-jawa?preset=minang-rumah-gadang";

  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: "networkidle", timeout: 20000 });
  await page.waitForSelector("button:has-text('Buka Undangan')", { timeout: 20000 });
  await page.waitForTimeout(1000);

  // 1. Cover Screen
  await page.screenshot({
    path: path.join(artifactsDir, "minang_cover.png"),
    fullPage: false,
  });
  console.log("Captured minang_cover.png");

  // 2. Click Buka Undangan
  const openBtn = page.locator("button:has-text('Buka Undangan')");
  if (await openBtn.count() > 0) {
    await openBtn.first().click();
    console.log("Clicked 'Buka Undangan'");
  } else {
    // Try click any button or seal
    await page.keyboard.press("Space");
  }

  // Wait for stage reveal animation
  await page.waitForTimeout(2000);

  // 3. Stage 2 Hero Screen
  await page.screenshot({
    path: path.join(artifactsDir, "minang_stage2_hero.png"),
    fullPage: false,
  });
  console.log("Captured minang_stage2_hero.png");

  await browser.close();
  console.log("Done!");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
