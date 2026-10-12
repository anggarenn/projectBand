const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  
  await page.goto('https://folkinvitation.id/tema/vintage-motion-sunda/', { waitUntil: 'networkidle' });
  
  // Find all buttons or links with "Buka"
  const btns = page.locator('text=/Buka Undangan/i');
  console.log('Button count:', await btns.count());
  
  if (await btns.count() > 0) {
    const btn = btns.first();
    console.log('Clicking button...');
    await btn.click({ force: true });
    
    // Wait for animation
    await page.waitForTimeout(4000);
    
    await page.screenshot({ path: 'qa-artifacts/folk-after-click.png' });
    console.log('Saved folk-after-click.png');
    
    // Scroll down a bit to see if it scrolls
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'qa-artifacts/folk-after-scroll.png' });
    console.log('Saved folk-after-scroll.png');
  }
  
  await browser.close();
})();
