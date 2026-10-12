/**
 * QA Automation Script: Aceh Black Heritage Verification
 * Captures Cover Screen and Opened Stage 2 Hero with Folk Invitation styling.
 */

const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

async function run() {
  const artifactsDir = "C:\\Users\\Ren\\.gemini\\antigravity\\brain\\e8ac61ab-ef63-4a6d-83cf-6e1e6dfa1c64";
  const publicQaDir = path.join(__dirname, "../public/assets/qa");
  if (!fs.existsSync(publicQaDir)) {
    fs.mkdirSync(publicQaDir, { recursive: true });
  }

  const browser = await chromium.launch({
    headless: true,
    channel: "msedge",
  });

  const context = await browser.newContext({
    viewport: { width: 430, height: 932 },
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();
  page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));
  page.on("pageerror", (err) => console.log("PAGE ERROR:", err.message));

  const url = "http://localhost:3000/demo/motion-art-jawa?preset=aceh";

  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: "networkidle", timeout: 20000 });
  await page.waitForSelector("button:has-text('Buka Undangan')", { timeout: 20000 });
  await page.waitForTimeout(1000);

  // 1. Cover Screen
  const coverPath = path.join(artifactsDir, "aceh_cover.png");
  await page.screenshot({ path: coverPath, fullPage: false });
  await page.screenshot({ path: path.join(publicQaDir, "aceh_cover.png"), fullPage: false });
  console.log("Captured aceh_cover.png");

  // 2. Click Buka Undangan
  const openBtn = page.locator("button:has-text('Buka Undangan')");
  if (await openBtn.count() > 0) {
    await openBtn.first().click();
    console.log("Clicked 'Buka Undangan'");
  }

  // Wait for stage reveal animation
  await page.waitForTimeout(2500);

  // 3. Stage 2 Hero Screen
  const stagePath = path.join(artifactsDir, "aceh_stage.png");
  await page.screenshot({ path: stagePath, fullPage: false });
  await page.screenshot({ path: path.join(publicQaDir, "aceh_stage.png"), fullPage: false });
  console.log("Captured aceh_stage.png");

  // 4. Click Mempelai in bottom dock
  const mempelaiBtn = page.locator("button:has-text('Mempelai')");
  if (await mempelaiBtn.count() > 0) {
    await mempelaiBtn.first().click();
    await page.waitForTimeout(1000);
  }
  const mempelaiPath = path.join(artifactsDir, "aceh_mempelai.png");
  await page.screenshot({ path: mempelaiPath, fullPage: false });
  console.log("Captured aceh_mempelai.png");

  // 5. Click Acara in bottom dock
  const acaraBtn = page.locator("button:has-text('Acara')");
  if (await acaraBtn.count() > 0) {
    await acaraBtn.first().click();
    await page.waitForTimeout(1000);
  }
  const acaraPath = path.join(artifactsDir, "aceh_acara.png");
  await page.screenshot({ path: acaraPath, fullPage: false });
  console.log("Captured aceh_acara.png");

  await browser.close();
  console.log("All screenshots captured successfully!");
}

run().catch((err) => {
  console.error("QA Capture Error:", err);
  process.exit(1);
});
