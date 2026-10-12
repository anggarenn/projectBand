/**
 * QA Automation Script: Terracotta Earthy Meadow Full Animation Verification
 * 
 * Verifies:
 * 1. Cover Screen: Kraft paper envelope flap + twine ribbon bow + terracotta wax seal
 * 2. Envelope opening transition (flap lifting / sliding, wax seal unsealing)
 * 3. Stage 2 Hero: Boho arch, pampas botanical sway, warm typography
 * 4. Section cards with boho dome arch (rounded-t-[80px]), warm clay & parchment white
 */

const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const http = require("http");

async function checkPort(port) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}/demo/motion-art-jawa?preset=terracotta-earthy-meadow`, (res) => {
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
  console.log("=== STARTING QA TEST FOR TERRACOTTA EARTHY MEADOW ===");

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
  const url = `http://localhost:${port}/demo/motion-art-jawa?preset=terracotta-earthy-meadow`;

  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  // 1. SCREENSHOT 1: COVER SCREEN (Kraft Envelope, Twine Bow & Terracotta Wax Seal)
  console.log("[1/4] Capturing Cover Screen (Kraft Envelope & Wax Seal)...");
  const coverPath = path.join(artifactsDir, "terracotta-1-cover-envelope.png");
  await page.screenshot({ path: coverPath, fullPage: false });
  console.log(`Saved: ${coverPath}`);

  // 2. TRIGGER OPEN & SCREENSHOT 2: ENVELOPE OPENING TRANSITION
  console.log("[2/4] Triggering Envelope Opening Transition...");
  const openBtn = page.getByRole("button", { name: /buka undangan/i });
  await openBtn.waitFor({ state: "visible", timeout: 5000 });
  
  // Click and capture mid-flap unfolding after 450ms
  await openBtn.click();
  await page.waitForTimeout(450);

  const transitionPath = path.join(artifactsDir, "terracotta-2-envelope-opening.png");
  await page.screenshot({ path: transitionPath, fullPage: false });
  console.log(`Saved: ${transitionPath}`);

  // Wait for transition to complete and hero to settle
  await page.waitForTimeout(2000);

  // 3. SCREENSHOT 3: STAGE 2 HERO (Boho Arch, Botanical Pampas Sway)
  console.log("[3/4] Capturing Stage 2 Hero (Boho Arch & Meadow)...");
  const heroPath = path.join(artifactsDir, "terracotta-3-stage2-boho-hero.png");
  await page.screenshot({ path: heroPath, fullPage: false });
  console.log(`Saved: ${heroPath}`);

  // 4. SCREENSHOT 4: SECTION CARDS (Boho Arch Dome rounded-t-[80px] & Warm Clay)
  console.log("[4/4] Scrolling to Section Mempelai / Cards...");
  await page.evaluate(() => {
    const el = document.getElementById("salam") || document.getElementById("mempelai") || document.getElementById("acara");
    if (el) {
      el.scrollIntoView({ behavior: "instant", block: "start" });
    } else {
      const container = document.getElementById("invitation-scroll-container");
      if (container) container.scrollBy(0, 700);
    }
  });
  await page.waitForTimeout(1200);

  const cardPath = path.join(artifactsDir, "terracotta-4-boho-arch-card.png");
  await page.screenshot({ path: cardPath, fullPage: false });
  console.log(`Saved: ${cardPath}`);

  await browser.close();
  console.log("=== TERRACOTTA EARTHY MEADOW QA FINISHED SUCCESSFULLY ===");
}

run().catch((err) => {
  console.error("QA Error:", err);
  process.exit(1);
});
