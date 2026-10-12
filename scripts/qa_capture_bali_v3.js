const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

async function captureBaliV3() {
  console.log("=== STARTING QA STAGE 2 BALI V3 VERIFICATION ===");
  const artifactsDir = path.join(__dirname, "..", "qa-artifacts");
  if (!fs.existsSync(artifactsDir)) {
    fs.mkdirSync(artifactsDir, { recursive: true });
  }

  const browser = await chromium.launch({
    channel: "msedge",
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 412, height: 915 }, // standard modern mobile viewport
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();
  const targetUrl = "http://localhost:3000/demo/motion-art-jawa?preset=bali";

  console.log(`Navigating to ${targetUrl}...`);
  await page.goto(targetUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  // Click 'Buka Undangan'
  console.log("Searching for 'Buka Undangan' button...");
  const openButton = page.locator("button:has-text('Buka Undangan')").first();
  await openButton.waitFor({ state: "visible", timeout: 10000 });
  await openButton.click();
  console.log("Clicked 'Buka Undangan'. Waiting for Stage 2 animations to settle...");

  // Allow zoom and fade-in animations to complete fully
  await page.waitForTimeout(3000);

  const screenshotPath = path.join(artifactsDir, "stage2-bali-v3.png");
  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log(`Saved Stage 2 Bali V3 screenshot to: ${screenshotPath}`);

  // Visual & DOM Inspection
  const html = await page.content();
  const evaluation = await page.evaluate(() => {
    // Check elements
    const bodyHeight = window.innerHeight;
    const bodyWidth = window.innerWidth;
    
    // Look for top canopy / header ornaments
    const svgElements = Array.from(document.querySelectorAll("svg"));
    const imgElements = Array.from(document.querySelectorAll("img"));

    // Check presence of top elements
    let topElements = 0;
    let bottomElements = 0;
    let particleCount = 0;

    svgElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top >= 0 && rect.top <= bodyHeight * 0.25) topElements++;
      if (rect.bottom >= bodyHeight * 0.75 && rect.top <= bodyHeight) bottomElements++;
    });

    const particles = document.querySelectorAll(".animate-particle, [class*='particle'], [class*='sparkle'], [class*='star']");
    particleCount = particles.length;

    // Check if background image is loaded and non-empty
    const bgImages = imgElements.filter(img => img.src && (img.src.includes("bali") || img.src.includes("candi")));

    const canvasElements = Array.from(document.querySelectorAll("canvas"));
    const canopyImg = imgElements.find(img => img.src && img.src.includes("bali-canopy-top"));
    const bgStageImg = imgElements.find(img => img.src && img.src.includes("bg-stage-bali-candibentar"));
    const floralLeft = imgElements.find(img => img.src && img.src.includes("bali-floral-left"));
    const floralRight = imgElements.find(img => img.src && img.src.includes("bali-floral-right"));

    return {
      bodyWidth,
      bodyHeight,
      svgCount: svgElements.length,
      imgCount: imgElements.length,
      canvasCount: canvasElements.length,
      hasCanopyImg: !!canopyImg,
      canopyNaturalHeight: canopyImg ? canopyImg.naturalHeight : 0,
      hasBgStageImg: !!bgStageImg,
      hasFloralLeft: !!floralLeft,
      hasFloralRight: !!floralRight,
      topElements,
      bottomElements,
      particleCount,
      bgImagesCount: bgImages.length,
    };
  });

  const checks = {
    hasCandiBentar: html.includes("candibentar") || html.includes("Candi Bentar") || html.includes("BaliStageBackdrop"),
    hasAksaraBali: html.includes("ᬯᬬᬦ᭄") || html.includes("ᬧᬸᬢᬸ") || html.includes("Aksara Bali"),
    hasKamboja: html.includes("kamboja") || html.includes("frangipani") || html.includes("BaliHeroContent"),
    hasCanopyImg: evaluation.hasCanopyImg,
    hasFirefliesCanvas: evaluation.canvasCount > 0,
    hasFloralCorners: evaluation.hasFloralLeft && evaluation.hasFloralRight,
    hasBgStage: evaluation.hasBgStageImg,
    hasJogloLeak: html.includes("bg-stage-joglo.webp") || html.includes("bg-cover-joglo.webp"),
  };

  const report = {
    timestamp: new Date().toISOString(),
    screenshot: screenshotPath,
    evaluation,
    checks,
    passStatus: checks.hasCandiBentar && checks.hasAksaraBali && checks.hasCanopyImg && checks.hasFirefliesCanvas && !checks.hasJogloLeak,
  };

  const reportPath = path.join(artifactsDir, "qa_bali_v3_report.json");
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`=== QA REPORT SAVED TO: ${reportPath} ===`);
  console.log(JSON.stringify(report, null, 2));

  await browser.close();
}

captureBaliV3().catch((err) => {
  console.error("QA Capture Error:", err);
  process.exit(1);
});
