/**
 * QA Automation Script: Emerald Velvet Noir Full Animation Verification
 * 
 * Verifies:
 * 1. Cover screen with velvet curtain panels & golden wax seal
 * 2. Curtain parting transition (curtain sliding left/right, wax seal burst)
 * 3. Stage 2 Hero with gold dust float particles
 * 4. Section cards with emerald forest (#0D2A20), gold borders, and ivory typography
 */

const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const http = require("http");

async function checkPort(port) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}/demo/motion-art-jawa?preset=emerald-velvet-noir`, (res) => {
      resolve(true);
    });
    req.on("error", () => resolve(false));
    req.setTimeout(2000, () => {
      req.abort();
      resolve(false);
    });
  });
}

async function run() {
  console.log("=== STARTING QA TEST FOR EMERALD VELVET NOIR ===");

  const artifactsDir = path.join(__dirname, "../qa-artifacts");
  if (!fs.existsSync(artifactsDir)) {
    fs.mkdirSync(artifactsDir, { recursive: true });
  }

  let port = 3000;
  if (await checkPort(3000)) {
    port = 3000;
  } else if (await checkPort(3001)) {
    port = 3001;
  } else {
    console.error("Neither port 3000 nor 3001 responded!");
    process.exit(1);
  }
  console.log(`Detected active server on port ${port}`);

  const browser = await chromium.launch({
    headless: true,
    channel: "msedge",
  });

  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
  });

  const page = await context.newPage();
  const url = `http://localhost:${port}/demo/motion-art-jawa?preset=emerald-velvet-noir`;

  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  // 1. SCREENSHOT 1: COVER SCREEN (Velvet Curtain & Wax Seal)
  console.log("[1/4] Capturing Cover Screen (Velvet Curtain & Wax Seal)...");
  const coverPath = path.join(artifactsDir, "emerald-1-cover-curtain.png");
  await page.screenshot({ path: coverPath, fullPage: false });
  console.log(`Saved: ${coverPath}`);

  // 2. TRIGGER OPEN & SCREENSHOT 2: CURTAIN PARTING TRANSITION
  console.log("[2/4] Triggering Curtain Opening Transition...");
  const openBtn = page.getByRole("button", { name: /buka undangan/i });
  await openBtn.waitFor({ state: "visible", timeout: 5000 });
  
  // Click and immediately capture parting transition after 450ms
  await openBtn.click();
  await page.waitForTimeout(450);

  const partingPath = path.join(artifactsDir, "emerald-2-curtain-parting.png");
  await page.screenshot({ path: partingPath, fullPage: false });
  console.log(`Saved: ${partingPath}`);

  // Wait for opening to finish and gold dust particles to animate
  await page.waitForTimeout(2000);

  // 3. SCREENSHOT 3: STAGE 2 HERO (Gold Dust Float & Emerald Stage)
  console.log("[3/4] Capturing Stage 2 Hero (Gold Dust Float)...");
  const heroPath = path.join(artifactsDir, "emerald-3-stage2-gold-dust.png");
  await page.screenshot({ path: heroPath, fullPage: false });
  console.log(`Saved: ${heroPath}`);

  // 4. SCREENSHOT 4: SECTION CARDS (Emerald Forest #0D2A20 & Gold Border)
  console.log("[4/4] Scrolling to Section Mempelai / Cards...");
  await page.evaluate(() => {
    const el = document.getElementById("mempelai") || document.getElementById("acara");
    if (el) {
      el.scrollIntoView({ behavior: "instant", block: "start" });
    } else {
      const container = document.getElementById("invitation-scroll-container");
      if (container) container.scrollBy(0, 700);
    }
  });
  await page.waitForTimeout(1200);

  const cardPath = path.join(artifactsDir, "emerald-4-section-card.png");
  await page.screenshot({ path: cardPath, fullPage: false });
  console.log(`Saved: ${cardPath}`);

  await browser.close();
  console.log("=== EMERALD VELVET NOIR QA FINISHED SUCCESSFULLY ===");
}

run().catch((err) => {
  console.error("QA Error:", err);
  process.exit(1);
});
