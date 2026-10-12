const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const PRESETS = [
  {
    id: "bali",
    query: "?preset=bali",
    name: "Bali Royal Candi Bentar",
    mustHave: ["Candi Bentar", "ᬯᬬᬦ᭄ & ᬧᬸᬢᬸ", "Kamboja / Frangipani"],
    mustNotHave: ["Joglo"],
  },
  {
    id: "minang",
    query: "?preset=minang",
    name: "Minangkabau Baralek Gadang",
    mustHave: ["Rumah Gadang Gonjong", "Suntiang", "Pucuk Rebung"],
    mustNotHave: ["Joglo"],
  },
  {
    id: "jawa-emerald",
    query: "?preset=jawa-emerald",
    name: "Jawa Keraton Emerald Gold",
    mustHave: ["Keraton Emerald", "ꦲꦤꦕꦫꦏ"],
    mustNotHave: [],
  },
  {
    id: "jawa-black-gold",
    query: "?preset=jawa-black-gold",
    name: "Jawa Keraton Royal Black Gold",
    mustHave: ["Keraton Joglo", "ꦲꦤꦕꦫꦏ"],
    mustNotHave: [],
  },
  {
    id: "sunda-vintage",
    query: "?preset=sunda-vintage",
    name: "Sunda Parahyangan Vintage",
    mustHave: ["Julang Ngapak", "ᮃᮞᮨᮕ᮪ & ᮜᮤᮜᮤᮞ᮪"],
    mustNotHave: [],
  },
];

async function runQA() {
  const artifactsDir = path.join(__dirname, "..", "qa-artifacts");
  if (!fs.existsSync(artifactsDir)) {
    fs.mkdirSync(artifactsDir, { recursive: true });
  }

  console.log("=== STARTING QA STAGE 2 HEADLESS VERIFICATION ===");
  const browser = await chromium.launch({
    channel: "msedge",
    headless: true,
  });

  const results = [];

  for (const p of PRESETS) {
    console.log(`\nTesting Preset: ${p.id} (${p.name})...`);
    const context = await browser.newContext({
      viewport: { width: 430, height: 932 }, // iPhone 14 Pro Max mobile size
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    const targetUrl = `http://localhost:3000/demo/motion-art-jawa${p.query}`;
    console.log(`Navigating to ${targetUrl}...`);

    try {
      await page.goto(targetUrl, { waitUntil: "networkidle", timeout: 20000 });
    } catch (e) {
      console.log(`Fallback wait for load: ${e.message}`);
      await page.waitForTimeout(3000);
    }

    // Capture Cover Screenshot
    const coverPath = path.join(artifactsDir, `cover-${p.id}.png`);
    await page.screenshot({ path: coverPath });
    console.log(`Saved cover screenshot: ${coverPath}`);

    // Click "Buka Undangan"
    console.log("Searching for 'Buka Undangan' button...");
    const openBtn = page.locator("button", { hasText: "Buka Undangan" });
    const btnCount = await openBtn.count();

    if (btnCount > 0) {
      console.log("Clicking 'Buka Undangan'...");
      await openBtn.first().click();
      // Wait for Stage 2 animations (1250ms transition + zoom in)
      await page.waitForTimeout(2500);
    } else {
      console.warn("Could not find 'Buka Undangan' button! Attempting to find any main button...");
      const anyBtn = page.locator("button");
      if ((await anyBtn.count()) > 0) {
        await anyBtn.first().click();
        await page.waitForTimeout(2500);
      }
    }

    // Capture Stage 2 Screenshot
    const stage2Path = path.join(artifactsDir, `stage2-${p.id}.png`);
    await page.screenshot({ path: stage2Path });
    console.log(`Saved Stage 2 screenshot: ${stage2Path}`);

    // Content Audit on Stage 2 DOM
    const html = await page.content();
    const checks = {
      presetId: p.id,
      name: p.name,
      screenshot: stage2Path,
      passedMustHave: [],
      failedMustHave: [],
      passedMustNotHave: [],
      failedMustNotHave: [],
    };

    // Specific text / asset checks
    if (p.id === "bali") {
      const hasCandiBentar = html.includes("candibentar") || html.includes("Candi Bentar") || html.includes("BaliStageBackdrop") || html.includes("Pawiwahan Ageng");
      const hasAksaraBali = html.includes("ᬯᬬᬦ᭄") || html.includes("BaliHeroContent");
      const hasKamboja = html.includes("bali-floral") || html.includes("Kamboja") || html.includes("Frangipani");
      const hasJoglo = html.includes("bg-stage-joglo.webp") || html.includes("bg-cover-joglo.webp");

      if (hasCandiBentar) checks.passedMustHave.push("Candi Bentar Gate");
      else checks.failedMustHave.push("Candi Bentar Gate");

      if (hasAksaraBali) checks.passedMustHave.push("Aksara Bali Script");
      else checks.failedMustHave.push("Aksara Bali Script");

      if (hasKamboja) checks.passedMustHave.push("Bunga Kamboja Floral");
      else checks.failedMustHave.push("Bunga Kamboja Floral");

      if (!hasJoglo) checks.passedMustNotHave.push("NO Joglo Backdrop (Verified)");
      else checks.failedMustNotHave.push("CRITICAL: Joglo detected in Bali preset!");
    } else if (p.id === "minang") {
      const hasRumahGadang = html.includes("rumahgadang") || html.includes("Rumah Gadang") || html.includes("Baralek Gadang") || html.includes("MinangStageBackdrop");
      const hasSuntiang = html.toLowerCase().includes("suntiang") || html.includes("MinangSuntiangEmblem");
      const hasPucukRebung = html.includes("Pucuk Rebung") || html.includes("minang-floral") || html.includes("MinangPucukRebungDivider");
      const hasJoglo = html.includes("bg-stage-joglo.webp") || html.includes("bg-cover-joglo.webp");

      if (hasRumahGadang) checks.passedMustHave.push("Rumah Gadang Gonjong");
      else checks.failedMustHave.push("Rumah Gadang Gonjong");

      if (hasSuntiang) checks.passedMustHave.push("Suntiang Emblem");
      else checks.failedMustHave.push("Suntiang Emblem");

      if (hasPucukRebung) checks.passedMustHave.push("Pucuk Rebung Ornaments");
      else checks.failedMustHave.push("Pucuk Rebung Ornaments");

      if (!hasJoglo) checks.passedMustNotHave.push("NO Joglo Backdrop (Verified)");
      else checks.failedMustNotHave.push("CRITICAL: Joglo detected in Minang preset!");
    } else if (p.id === "jawa-emerald") {
      const hasEmerald = html.includes("joglo-emerald") || html.includes("Keraton Emerald") || html.includes("#09140F") || html.includes("#0E1E17");
      const hasAksaraJawa = html.includes("ꦲꦤꦕꦫꦏ");

      if (hasEmerald) checks.passedMustHave.push("Keraton Emerald Palette");
      else checks.failedMustHave.push("Keraton Emerald Palette");

      if (hasAksaraJawa) checks.passedMustHave.push("Aksara Jawa Script");
      else checks.failedMustHave.push("Aksara Jawa Script");
    } else if (p.id === "jawa-black-gold") {
      const hasJoglo = html.includes("joglo") || html.includes("Royal Gold") || html.includes("#12100E");
      const hasAksaraJawa = html.includes("ꦲꦤꦕꦫꦏ");

      if (hasJoglo) checks.passedMustHave.push("Keraton Joglo Architecture");
      else checks.failedMustHave.push("Keraton Joglo Architecture");

      if (hasAksaraJawa) checks.passedMustHave.push("Aksara Jawa Script");
      else checks.failedMustHave.push("Aksara Jawa Script");
    } else if (p.id === "sunda-vintage") {
      const hasJulangNgapak = html.includes("julangngapak") || html.includes("Julang Ngapak") || html.includes("Megamendung");
      const hasAksaraSunda = html.includes("ᮃᮞᮨᮕ᮪") || html.includes("SundaHeroContent");

      if (hasJulangNgapak) checks.passedMustHave.push("Rumah Julang Ngapak");
      else checks.failedMustHave.push("Rumah Julang Ngapak");

      if (hasAksaraSunda) checks.passedMustHave.push("Aksara Sunda Script");
      else checks.failedMustHave.push("Aksara Sunda Script");
    }

    results.push(checks);
    await context.close();
  }

  await browser.close();

  const reportPath = path.join(artifactsDir, "qa_verification_report.json");
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\n=== QA SUMMARY REPORT SAVED TO: ${reportPath} ===`);
  console.log(JSON.stringify(results, null, 2));
}

runQA().catch((err) => {
  console.error("QA Test execution failed:", err);
  process.exit(1);
});
