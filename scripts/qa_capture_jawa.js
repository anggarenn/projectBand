const { chromium } = require("playwright");
const path = require("path");

async function run() {
  const artifactsDir = "C:\\Users\\Ren\\.gemini\\antigravity\\brain\\e8ac61ab-ef63-4a6d-83cf-6e1e6dfa1c64";

  const browser = await chromium.launch({
    headless: true,
    channel: "msedge",
  });

  const context = await browser.newContext({
    viewport: { width: 430, height: 932 },
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();
  const url = "http://localhost:3000/demo/motion-art-jawa?preset=jawa-black-gold";

  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: "networkidle", timeout: 20000 });
  await page.waitForSelector("button:has-text('Buka Undangan')", { timeout: 20000 });
  await page.waitForTimeout(1000);

  // 1. Cover Screen Restored
  const coverPath = path.join(artifactsDir, "jawa_restored_cover.png");
  await page.screenshot({ path: coverPath, fullPage: false });
  console.log(`Saved: ${coverPath}`);

  // Click Buka Undangan
  await page.click("button:has-text('Buka Undangan')");
  await page.waitForTimeout(2000);

  // 2. Stage 2 Restored
  const stagePath = path.join(artifactsDir, "jawa_restored_stage.png");
  await page.screenshot({ path: stagePath, fullPage: false });
  console.log(`Saved: ${stagePath}`);

  await browser.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
