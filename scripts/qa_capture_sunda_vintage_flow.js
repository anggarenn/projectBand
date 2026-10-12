/**
 * QA Full Flow Comprehensive Capture Script for Sunda Vintage Folk Parahyangan
 * Captures all stages & sections matching Folkinvitation reference:
 * 1. Cover screen
 * 2. Stage 2 Hero Video (at 13s)
 * 3. Section Salam & Ayat Suci (Ar-Rum 21)
 * 4. Section Mempelai - Bride (Sarah / Panganten Istri)
 * 5. Section Mempelai - Groom (Faizal / Panganten Pameget)
 * 6. Section Acara (Akad Nikah & Resepsi)
 * 7. Section Kisah Cinta (Love Story)
 * 8. Section Galeri (Our Gallery)
 * 9. Section Kado / Amplop Digital (Hadiah Pernikahan)
 * 10. Section Ucapan & RSVP (Doa & Pangharepan + Footer Hatur Nuhun)
 */

const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const http = require("http");

async function checkPort(port) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}/demo/motion-art-jawa?preset=sunda-vintage`, (res) => {
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
  console.log("=== STARTING FULL FLOW QA FOR SUNDA VINTAGE ===");

  const artifactsDir = path.join(__dirname, "../qa-artifacts");
  if (!fs.existsSync(artifactsDir)) {
    fs.mkdirSync(artifactsDir, { recursive: true });
  }

  // Determine active port (3000 or 3001)
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
  const url = `http://localhost:${port}/demo/motion-art-jawa?preset=sunda-vintage`;

  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  // 1. SCREEN 1: COVER SCREEN
  console.log("[1/11] Capturing Cover Screen...");
  const coverPath = path.join(artifactsDir, "flow-1-cover.png");
  await page.screenshot({ path: coverPath, fullPage: false });
  console.log(`Saved: ${coverPath}`);

  // 2. CLICK 'BUKA UNDANGAN'
  console.log("Clicking 'Buka Undangan'...");
  const openBtn = page.getByRole("button", { name: /buka undangan/i });
  await openBtn.waitFor({ state: "visible", timeout: 5000 });
  await openBtn.click();

  // Wait for stage 2 transition
  await page.waitForTimeout(2000);

  // Seek video to 13.0s
  await page.evaluate(async () => {
    const video = document.querySelector("video");
    if (video) {
      video.currentTime = 13.0;
      await new Promise((r) => {
        video.onseeked = r;
        setTimeout(r, 1500);
      });
    }
  });
  await page.waitForTimeout(800);

  // 2. SCREEN 2: STAGE 2 HERO
  console.log("[2/11] Capturing Stage 2 Hero Video...");
  const heroPath = path.join(artifactsDir, "flow-2-stage2-hero.png");
  await page.screenshot({ path: heroPath, fullPage: false });
  console.log(`Saved: ${heroPath}`);

  // Helper to scroll element into view with offset
  async function scrollElement(selector, align = "start") {
    return page.evaluate(({ sel, al }) => {
      const el = document.querySelector(sel);
      if (el) {
        el.scrollIntoView({ behavior: "instant", block: al });
        return true;
      }
      return false;
    }, { sel: selector, al: align });
  }

  // 3. SCREEN 3: SALAM & AYAT SUCI
  console.log("[3/11] Scrolling to Section Salam...");
  await scrollElement("#salam", "start");
  await page.waitForTimeout(1000);
  const salamPath = path.join(artifactsDir, "flow-3-salam.png");
  await page.screenshot({ path: salamPath, fullPage: false });
  console.log(`Saved: ${salamPath}`);

  // 4. SCREEN 4: MEMPELAI - BRIDE
  console.log("[4/11] Scrolling to Bride Card...");
  await scrollElement("#mempelai", "start");
  await page.waitForTimeout(1000);
  const bridePath = path.join(artifactsDir, "flow-4-mempelai-bride.png");
  await page.screenshot({ path: bridePath, fullPage: false });
  console.log(`Saved: ${bridePath}`);

  // 5. SCREEN 5: MEMPELAI - GROOM
  console.log("[5/11] Scrolling to Groom Card...");
  await page.evaluate(() => {
    const container = document.getElementById("invitation-scroll-container");
    if (container) container.scrollBy(0, 520);
  });
  await page.waitForTimeout(1000);
  const groomPath = path.join(artifactsDir, "flow-5-mempelai-groom.png");
  await page.screenshot({ path: groomPath, fullPage: false });
  console.log(`Saved: ${groomPath}`);

  // 6. SCREEN 6: ACARA
  console.log("[6/11] Scrolling to Section Acara...");
  await scrollElement("#acara", "start");
  await page.waitForTimeout(1000);
  const acaraPath = path.join(artifactsDir, "flow-6-acara.png");
  await page.screenshot({ path: acaraPath, fullPage: false });
  console.log(`Saved: ${acaraPath}`);

  // 7. SCREEN 7: KISAH CINTA (CERITA)
  console.log("[7/11] Scrolling to Section Kisah Cinta...");
  const hasCerita = await scrollElement("#cerita", "start");
  if (hasCerita) {
    await page.waitForTimeout(1000);
    const ceritaPath = path.join(artifactsDir, "flow-7-kisah-cinta.png");
    await page.screenshot({ path: ceritaPath, fullPage: false });
    console.log(`Saved: ${ceritaPath}`);
  }

  // 8. SCREEN 8: GALERI
  console.log("[8/11] Scrolling to Section Galeri...");
  const hasGaleri = await scrollElement("#galeri", "start");
  if (hasGaleri) {
    await page.waitForTimeout(1000);
    const galeriPath = path.join(artifactsDir, "flow-8-galeri.png");
    await page.screenshot({ path: galeriPath, fullPage: false });
    console.log(`Saved: ${galeriPath}`);
  }

  // 9. SCREEN 9: KADO / AMPLOP DIGITAL
  console.log("[9/11] Scrolling to Section Kado...");
  const hasKado = await scrollElement("#kado", "start");
  if (hasKado) {
    await page.waitForTimeout(1000);
    const kadoPath = path.join(artifactsDir, "flow-9-kado.png");
    await page.screenshot({ path: kadoPath, fullPage: false });
    console.log(`Saved: ${kadoPath}`);
  }

  // 10. SCREEN 10: UCAPAN & DOA
  console.log("[10/11] Scrolling to Section Ucapan...");
  const hasUcapan = await scrollElement("#ucapan", "start");
  if (hasUcapan) {
    await page.waitForTimeout(1000);
    const ucapanPath = path.join(artifactsDir, "flow-10-ucapan.png");
    await page.screenshot({ path: ucapanPath, fullPage: false });
    console.log(`Saved: ${ucapanPath}`);
  }

  // 11. SCREEN 11: FOOTER (HATUR NUHUN)
  console.log("[11/11] Scrolling to Footer...");
  await page.evaluate(() => {
    const container = document.getElementById("invitation-scroll-container");
    if (container) container.scrollTo(0, container.scrollHeight);
  });
  await page.waitForTimeout(1000);
  const footerPath = path.join(artifactsDir, "flow-11-footer.png");
  await page.screenshot({ path: footerPath, fullPage: false });
  console.log(`Saved: ${footerPath}`);

  await browser.close();
  console.log("=== FULL FLOW QA RUN COMPLETED SUCCESSFULLY ===");
}

run().catch((err) => {
  console.error("QA Run Error:", err);
  process.exit(1);
});
