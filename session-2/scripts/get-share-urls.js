/**
 * get-share-urls.js — Create & share MakeCode projects, print share URLs
 */
const { chromium } = require('playwright');

const IDEAS = [
  { name: 'Twinkling Star', emoji: '⭐', code: `basic.forever(function () {
    basic.showLeds(\`
        . . # . .
        . # . # .
        # . . . #
        . # . # .
        . . # . .
    \`)
    basic.pause(400)
    basic.showLeds(\`
        . . # . .
        . # # # .
        # # # # #
        . # # # .
        . . # . .
    \`)
    basic.pause(400)
})` },
  { name: 'Rocket Launch', emoji: '🚀', code: `basic.forever(function () {
    basic.showLeds(\`
        . . # . .
        . # # # .
        . # # # .
        . . # . .
        . # . # .
    \`)
    basic.pause(400)
    basic.showLeds(\`
        . . . . .
        . . # . .
        . # # # .
        . # # # .
        . # . # .
    \`)
    basic.pause(400)
    basic.clearScreen()
    basic.pause(300)
})` },
  { name: 'Cat Blinking', emoji: '🐱', code: `basic.forever(function () {
    basic.showLeds(\`
        # . . . #
        . # # # .
        . # . # .
        # . # . #
        . . # . .
    \`)
    basic.pause(800)
    basic.showLeds(\`
        # . . . #
        . # # # .
        . # # # .
        # . # . #
        . . # . .
    \`)
    basic.pause(180)
})` },
  { name: 'Ocean Waves', emoji: '🌊', code: `basic.forever(function () {
    basic.showLeds(\`
        . . . . .
        # . # . #
        # # # # #
        . # . # .
        . . . . .
    \`)
    basic.pause(400)
    basic.showLeds(\`
        . . . . .
        . # . # .
        # # # # #
        # . # . #
        . . . . .
    \`)
    basic.pause(400)
})` },
  { name: 'Jumping Alien', emoji: '👾', code: `basic.forever(function () {
    basic.showLeds(\`
        # . # . #
        . # # # .
        # # # # #
        # . . . #
        . # . # .
    \`)
    basic.pause(400)
    basic.showLeds(\`
        . # . # .
        # . # . #
        # # # # #
        # . . . #
        # . . . #
    \`)
    basic.pause(400)
})` },
  { name: 'Beating Heart', emoji: '❤️', code: `basic.forever(function () {
    basic.showLeds(\`
        . # . # .
        # # # # #
        # # # # #
        . # # # .
        . . # . .
    \`)
    basic.pause(400)
    basic.showLeds(\`
        . . . . .
        . # . # .
        . # # # .
        . . # . .
        . . . . .
    \`)
    basic.pause(400)
})` },
];

async function createAndShare(page, idea) {
  await page.goto('https://makecode.microbit.org/');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);

  await page.locator('.newprojectcard').first().click();
  await page.waitForTimeout(1500);
  const ni = page.locator('.ui.page.dimmer input').first();
  if (await ni.isVisible({ timeout: 3000 }).catch(() => false)) await ni.fill(idea.name);
  await page.locator('button:has-text("Create")').first().click();
  await page.waitForTimeout(1500);
  await page.waitForSelector('#editortoggle', { timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(2500);
  await page.locator('.teaching-bubble-close').first().click().catch(() => {});
  await page.waitForTimeout(300);

  // Paste code
  await page.locator('#editortoggle .javascript-menuitem').first().click({ force: true });
  await page.waitForTimeout(2000);
  await page.evaluate((c) => {
    const models = window.monaco && window.monaco.editor.getModels();
    if (models && models.length > 0) models[0].setValue(c);
  }, idea.code);
  await page.waitForTimeout(1500);

  // Click the share icon at (1076, 30)
  await page.mouse.click(1076, 30);
  await page.waitForTimeout(1500);

  // Click "Share Project" publish button
  const publishBtn = page.locator('.share-publish-button, button:has-text("Share Project")').first();
  if (await publishBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
    await publishBtn.click();
    console.log('  Clicked "Share Project"');
    await page.waitForTimeout(5000); // wait for upload
  } else {
    console.log('  Share Project button not found');
    return null;
  }

  // Extract the share URL
  const shareUrl = await page.evaluate(() => {
    // Look for an input with the share URL
    for (const input of document.querySelectorAll('input[type="text"], input:not([type])')) {
      if (input.value && (input.value.includes('makecode') || input.value.includes('pxt'))) {
        return input.value;
      }
    }
    // Look for a link
    for (const a of document.querySelectorAll('.project-share a, .share-url a, [class*="share"] a')) {
      if (a.href && !a.href.includes('#editor') && !a.href.includes('javascript')) {
        return a.href;
      }
    }
    // Look for any text that looks like a share URL
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
  const results = [];

  for (const idea of IDEAS) {
    console.log(`\n${idea.emoji} ${idea.name}`);
    try {
      const url = await createAndShare(page, idea);
      results.push({ ...idea, url });
      console.log(`  URL: ${url || 'NOT FOUND'}`);
    } catch (e) {
      console.log(`  Error: ${e.message}`);
      results.push({ ...idea, url: null });
    }
  }

  console.log('\n\n=== FINAL RESULTS ===');
  results.forEach(r => console.log(`${r.emoji} ${r.name}: ${r.url}`));
  await browser.close();
})();
