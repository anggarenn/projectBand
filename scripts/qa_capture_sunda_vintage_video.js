const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

async function captureSundaVintageVideo() {
  console.log("=== STARTING QA STAGE 2 SUNDA VINTAGE NATIVE VIDEO MOTION ===");
  const artifactsDir = path.join(__dirname, "..", "qa-artifacts");
  if (!fs.existsSync(artifactsDir)) {
    fs.mkdirSync(artifactsDir, { recursive: true });
  }

  const browser = await chromium.launch({
    channel: "msedge",
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });

  // 1. TEST SUNDA VINTAGE PRESET
  console.log("\n[1/2] Testing Sunda Vintage preset...");
  const page = await context.newPage();
  const vintageUrl = "http://localhost:3000/demo/motion-art-jawa?preset=sunda-vintage";
  await page.goto(vintageUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  // Click 'Buka Undangan'
  const openBtn = page.locator("button:has-text('Buka Undangan')").first();
  await openBtn.waitFor({ state: "visible", timeout: 10000 });
  await openBtn.click();
  console.log("Clicked 'Buka Undangan'. Waiting for Stage 2 animations...");

  // Inspect video element
  const videoStatus = await page.evaluate(async () => {
    const video = document.querySelector("video");
    if (!video) return { found: false };

    // Seek to 13.0s (detik 12 - 14 di mana kupu-kupu mengepak dan bingkai etsa terlihat jelas)
    video.currentTime = 13.0;
    await new Promise((r) => {
      video.onseeked = r;
      setTimeout(r, 1500);
    });

    return {
      found: true,
      src: video.currentSrc || video.src,
      currentTime: video.currentTime,
      duration: video.duration,
      paused: video.paused,
      readyState: video.readyState,
      videoWidth: video.videoWidth,
      videoHeight: video.videoHeight,
    };
  });
  console.log("Video status at Stage 2:", JSON.stringify(videoStatus, null, 2));

  // Settle frame
  await page.waitForTimeout(1000);

  const cleanScreenshotPath = path.join(
    artifactsDir,
    "stage2-sunda-vintage-clean.png"
  );
  await page.screenshot({ path: cleanScreenshotPath, fullPage: false });
  // Also keep video-motion and perfect updated
  await page.screenshot({
    path: path.join(artifactsDir, "stage2-sunda-vintage-video-motion.png"),
    fullPage: false,
  });
  await page.screenshot({
    path: path.join(artifactsDir, "stage2-sunda-vintage-perfect.png"),
    fullPage: false,
  });
  console.log(`Saved screenshot: ${cleanScreenshotPath}`);
  await page.close();

  // 2. TEST SUNDA MIDNIGHT SANITY CHECK
  console.log("\n[2/2] Sanity check: Testing Sunda Midnight Navy Gold...");
  const midnightPage = await context.newPage();
  const midnightUrl = "http://localhost:3000/demo/motion-art-sunda";
  await midnightPage.goto(midnightUrl, { waitUntil: "networkidle" });
  await midnightPage.waitForTimeout(1000);

  const midnightBtn = midnightPage.locator("button:has-text('Midnight')").first();
  if (await midnightBtn.isVisible()) {
    await midnightBtn.click();
    console.log("Clicked 'Midnight Gold' toggle...");
    await midnightPage.waitForTimeout(500);
  }

  const midnightOpenBtn = midnightPage.locator("button:has-text('Buka Undangan')").first();
  await midnightOpenBtn.waitFor({ state: "visible", timeout: 10000 });
  await midnightOpenBtn.click();
  console.log("Clicked 'Buka Undangan' on midnight mode...");
  await midnightPage.waitForTimeout(3500);

  const midnightScreenshotPath = path.join(
    artifactsDir,
    "stage2-sunda-midnight-sanity.png"
  );
  await midnightPage.screenshot({ path: midnightScreenshotPath, fullPage: false });
  console.log(`Saved screenshot: ${midnightScreenshotPath}`);
  await midnightPage.close();

  await browser.close();
  console.log("\n=== QA VERIFICATION EXECUTION COMPLETE ===");
}

captureSundaVintageVideo().catch((err) => {
  console.error("Error running captureSundaVintageVideo:", err);
  process.exit(1);
});
