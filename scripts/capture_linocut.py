import asyncio
import os
from playwright.async_api import async_playwright

async def capture():
    out_dir = r"d:\Ren\Project Web\invitation-app\public\assets\qa"
    os.makedirs(out_dir, exist_ok=True)
    
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(
            viewport={"width": 430, "height": 932},
            device_scale_factor=2,
            is_mobile=True,
            has_touch=True,
        )
        page = await context.new_page()
        
        url = "http://localhost:3000/demo/motion-art-jawa?preset=woodcut"
        print("Navigating to:", url)
        await page.goto(url, wait_until="networkidle")
        await asyncio.sleep(2)
        
        # Cover screenshot
        cover_path = os.path.join(out_dir, "linocut_cover.png")
        await page.screenshot(path=cover_path)
        print("Saved cover:", cover_path)
        
        # Click "Buka Undangan"
        button = page.locator("button:has-text('Buka Undangan')")
        if await button.count() > 0:
            print("Clicking Buka Undangan...")
            await button.first.click()
            await asyncio.sleep(2.5)
            
            # Stage screenshot
            stage_path = os.path.join(out_dir, "linocut_stage.png")
            await page.screenshot(path=stage_path)
            print("Saved stage:", stage_path)
        
        await browser.close()
        print("Done!")

if __name__ == "__main__":
    asyncio.run(capture())
