const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 540, height: 960 }, deviceScaleFactor: 1 });
  const videoPath = path.resolve('qa-artifacts/folk_assets/Motionn-Cultur-Sunda.mp4').replace(/\\/g, '/');
  
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body style="margin:0; background:#000; overflow:hidden;">
        <video id="v" src="http://localhost:3000/assets/motion-art-sunda/Motionn-Cultur-Sunda.mp4" muted playsinline preload="auto" style="width:100vw; height:100vh; object-fit:cover;"></video>
      </body>
    </html>
  `);
  
  await page.waitForFunction(() => {
    const v = document.getElementById('v');
    return v.readyState >= 2;
  }, { timeout: 15000 });
  
  for (const sec of [8.0, 11.0, 13.5, 16.0, 20.0]) {
    await page.evaluate(s => {
      const v = document.getElementById('v');
      v.currentTime = s;
    }, sec);
    await page.waitForTimeout(600);
    const outPath = `qa-artifacts/video_frame_${sec}s.png`;
    await page.screenshot({ path: outPath });
    console.log('Saved:', outPath);
  }
  
  await browser.close();
})();
