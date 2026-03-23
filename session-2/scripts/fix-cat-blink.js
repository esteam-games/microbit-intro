/**
 * fix-cat-blink.js — Create an improved Cat Blinking project and get its share URL
 */
const { chromium } = require('playwright');

const CAT_CODE = `basic.forever(function () {
    // Eyes open — hold this for a while
    basic.showLeds(\`
        # . . . #
        . # # # .
        . # . # .
        # . # . #
        . . # . .
    \`)
    basic.pause(800)
    // Blink — eyes squeeze shut briefly
    basic.showLeds(\`
        # . . . #
        . # # # .
        . # # # .
        # . # . #
        . . # . .
    \`)
    basic.pause(180)
})`;

async function createAndShare(page) {
  await page.goto('https://makecode.microbit.org/');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);

  // New project
  await page.locator('.newprojectcard').first().click();
  await page.waitForTimeout(1500);
  const ni = page.locator('.ui.page.dimmer input').first();
  if (await ni.isVisible({ timeout: 3000 }).catch(() => false)) await ni.fill('Cat Blinking');
  await page.locator('button:has-text("Create")').first().click();
  await page.waitForTimeout(1500);
  await page.waitForSelector('#editortoggle', { timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(2500);
  await page.locator('.teaching-bubble-close').first().click().catch(() => {});
  await page.waitForTimeout(300);

  // Switch to JavaScript and paste code
  await page.locator('#editortoggle .javascript-menuitem').first().click({ force: true });
  await page.waitForTimeout(2000);
  await page.evaluate((c) => {
    const models = window.monaco && window.monaco.editor.getModels();
    if (models && models.length > 0) models[0].setValue(c);
  }, CAT_CODE);
  await page.waitForTimeout(1500);

  // Open share dialog
  await page.mouse.click(1076, 30);
  await page.waitForTimeout(1500);

  // Click "Share Project" / publish
  const publishBtn = page.locator('.share-publish-button, button:has-text("Share Project")').first();
  if (await publishBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
    await publishBtn.click();
    console.log('  Clicked "Share Project"');
    await page.waitForTimeout(6000);
  } else {
    console.log('  Share Project button not found');
    return null;
  }

  // Extract share URL
  const shareUrl = await page.evaluate(() => {
    for (const input of document.querySelectorAll('input[type="text"], input:not([type])')) {
      if (input.value && (input.value.includes('makecode') || input.value.includes('pxt'))) {
        return input.value;
      }
    }
    for (const a of document.querySelectorAll('.project-share a, .share-url a, [class*="share"] a')) {
      if (a.href && !a.href.includes('#editor') && !a.href.includes('javascript')) {
        return a.href;
      }
    }
    const text = document.querySelector('.project-share')?.textContent || '';
    const m = text.match(/https:\/\/makecode\.microbit\.org\/[A-Za-z0-9_-]+/);
    return m ? m[0] : null;
  });

  return shareUrl;
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1400, height: 900 },
    permissions: ['clipboard-read', 'clipboard-write'],
  });
  const page = await context.newPage();

  console.log('🐱 Creating improved Cat Blinking project...');
  try {
    const url = await createAndShare(page);
    console.log(`\n✅ New Cat Blinking URL: ${url || 'NOT FOUND'}`);
    if (url) {
      console.log(`\nUpdate index.html: replace the old Cat Blinking href with:\n  ${url}`);
    }
  } catch (e) {
    console.log(`  Error: ${e.message}`);
  }

  await browser.close();
})();
