const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 430, height: 932 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });

  const page = await context.newPage();
  const url = "http://localhost:3000/demo/motion-art-jawa?preset=woodcut";
  console.log("Navigating to:", url);
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  const outDir = path.join(__dirname, "..", "public", "assets", "qa");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Frame 1: Cover Screen
  const coverPath = path.join(outDir, "linocut_cover.png");
  await page.screenshot({ path: coverPath });
  console.log("Cover captured:", coverPath);

  // Click "Buka Undangan"
  const openButton = page.locator("button:has-text('Buka Undangan')");
  if (await openButton.isVisible()) {
    console.log("Clicking 'Buka Undangan'...");
    await openButton.click();
    await page.waitForTimeout(2500); // Wait for door opening animation
  } else {
    console.log("Open button not found, clicking any primary button...");
    const btn = page.locator("button").first();
    await btn.click();
    await page.waitForTimeout(2500);
  }

  // Frame 2: Stage 2
  const stagePath = path.join(outDir, "linocut_stage.png");
  await page.screenshot({ path: stagePath });
  console.log("Stage captured:", stagePath);

  await browser.close();
  console.log("Done!");
})();
