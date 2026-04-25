const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const failedRequests = [];
  page.on('requestfailed', request => {
    failedRequests.push(`${request.url()}: ${request.failure()?.errorText || 'unknown error'}`);
  });
  page.on('response', response => {
    if (response.status() >= 400) {
      failedRequests.push(`${response.url()}: ${response.status()}`);
    }
  });

  const filePath = 'file://' + path.join(process.cwd(), 'index.html');
  console.log('Navigating to:', filePath);

  try {
    await page.goto(filePath);
    await page.waitForTimeout(2000); // Wait for things to load

    const images = await page.$$eval('img', imgs => imgs.map(img => img.src));
    console.log('Images found on page:', images);

    if (failedRequests.length > 0) {
      console.error('Failed requests found:');
      failedRequests.forEach(err => console.error('  ' + err));
    } else {
      console.log('No failed requests found.');
    }

    const title = await page.title();
    console.log('Page Title:', title);

  } catch (error) {
    console.error('An error occurred during navigation:', error);
  } finally {
    await browser.close();
  }
})();
