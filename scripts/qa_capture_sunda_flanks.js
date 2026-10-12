const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

async function captureSundaFlanks() {
  console.log("=== STARTING QA STAGE 2 SUNDA FLANKS & CANOPY VERIFICATION ===");
  const artifactsDir = path.join(__dirname, "..", "qa-artifacts");
  if (!fs.existsSync(artifactsDir)) {
    fs.mkdirSync(artifactsDir, { recursive: true });
  }

  const browser = await chromium.launch({
    channel: "msedge",
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }, // standard mobile viewport
    deviceScaleFactor: 2,
  });

  const targets = [
    {
      name: "sunda-midnight",
      url: "http://localhost:3000/demo/motion-art-sunda",
      output: path.join(artifactsDir, "stage2-sunda-flanks-verified.png"),
    },
    {
      name: "sunda-vintage",
      url: "http://localhost:3000/demo/motion-art-jawa?preset=sunda-vintage",
      output: path.join(artifactsDir, "stage2-sunda-vintage-flanks-verified.png"),
    },
  ];

  const results = {};

  for (const target of targets) {
    const page = await context.newPage();
    await page.goto(target.url, { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);

    if (target.name === "sunda-midnight") {
      const midnightBtn = page.locator("button:has-text('Midnight')").first();
      if (await midnightBtn.isVisible()) {
        await midnightBtn.click();
        console.log("Clicked 'Midnight Gold' theme toggle...");
        await page.waitForTimeout(500);
      }
    }

    // Click 'Buka Undangan'
    const openButton = page.locator("button:has-text('Buka Undangan')").first();
    await openButton.waitFor({ state: "visible", timeout: 10000 });
    await openButton.click();
    console.log("Clicked 'Buka Undangan'. Waiting for Stage 2 animations to settle...");
    await page.waitForTimeout(3500);

    await page.screenshot({ path: target.output, fullPage: false });
    console.log(`Saved screenshot: ${target.output}`);

    // Inspect DOM & bounding boxes
    const metrics = await page.evaluate(() => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const centerX = vw / 2;

      // Canopy
      const canopyImg = document.querySelector('img[alt*="Megamendung Symmetrical Crown Top"], img[alt*="Megamendung Crown Top"]');
      let canopyData = null;
      if (canopyImg) {
        const rect = canopyImg.getBoundingClientRect();
        canopyData = {
          left: rect.left,
          right: rect.right,
          width: rect.width,
          height: rect.height,
          centerX: (rect.left + rect.right) / 2,
          deviationFromCenter: (rect.left + rect.right) / 2 - centerX,
        };
      }

      // Upper flank clouds
      const flankLeftUpper = document.querySelector('img[alt*="Sayap Kiri Atas Megamendung"]');
      const flankRightUpper = document.querySelector('img[alt*="Sayap Kanan Atas Megamendung"]');
      let flankUpperData = null;
      if (flankLeftUpper && flankRightUpper) {
        const rectL = flankLeftUpper.getBoundingClientRect();
        const rectR = flankRightUpper.getBoundingClientRect();
        flankUpperData = {
          left: { x: rectL.left, y: rectL.top, w: rectL.width, h: rectL.height },
          right: { x: rectR.left, y: rectR.top, w: rectR.width, h: rectR.height },
          marginL: rectL.left,
          marginR: vw - rectR.right,
          marginDiff: Math.abs(rectL.left - (vw - rectR.right)),
          yDiff: Math.abs(rectL.top - rectR.top),
          wDiff: Math.abs(rectL.width - rectR.width),
          hDiff: Math.abs(rectL.height - rectR.height),
        };
      }

      // Lower flank clouds
      const flankLeftLower = document.querySelector('img[alt*="Sayap Kiri Bawah Megamendung"]');
      const flankRightLower = document.querySelector('img[alt*="Sayap Kanan Bawah Megamendung"]');
      let flankLowerData = null;
      if (flankLeftLower && flankRightLower) {
        const rectL = flankLeftLower.getBoundingClientRect();
        const rectR = flankRightLower.getBoundingClientRect();
        flankLowerData = {
          left: { x: rectL.left, y: rectL.top, w: rectL.width, h: rectL.height },
          right: { x: rectR.left, y: rectR.top, w: rectR.width, h: rectR.height },
          marginL: rectL.left,
          marginR: vw - rectR.right,
          marginDiff: Math.abs(rectL.left - (vw - rectR.right)),
          yDiff: Math.abs(rectL.top - rectR.top),
          wDiff: Math.abs(rectL.width - rectR.width),
          hDiff: Math.abs(rectL.height - rectR.height),
        };
      }

      // Name card container
      const nameCard = document.querySelector('[class*="border-amber-400"], [class*="border-amber-200"], [class*="MegamendungNameBorder"]');
      let cardData = null;
      let textOverlap = false;
      if (nameCard) {
        const rect = nameCard.getBoundingClientRect();
        cardData = {
          left: rect.left,
          right: rect.right,
          top: rect.top,
          bottom: rect.bottom,
          width: rect.width,
        };

        // Check if upper flank overlaps card content significantly
        if (flankLeftUpper) {
          const rectL = flankLeftUpper.getBoundingClientRect();
          // overlap if rectL.right > rect.left + 20
          if (rectL.right > rect.left + 25) textOverlap = true;
        }
      }

      return {
        vw,
        vh,
        centerX,
        canopyData,
        flankUpperData,
        flankLowerData,
        cardData,
        textOverlap,
      };
    });

    results[target.name] = metrics;
    console.log("Metrics:", JSON.stringify(metrics, null, 2));
    await page.close();
  }

  await browser.close();

  fs.writeFileSync(
    path.join(artifactsDir, "sunda_flanks_verification.json"),
    JSON.stringify(results, null, 2)
  );
  console.log("Verification metrics written to sunda_flanks_verification.json");
}

captureSundaFlanks().catch((err) => {
  console.error("Error in captureSundaFlanks:", err);
  process.exit(1);
});
