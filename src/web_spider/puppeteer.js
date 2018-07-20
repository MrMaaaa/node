const puppeteer = require('puppeteer');

let pageIndex = 1;
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath:
      '../../node_modules/puppeteer/local-chromium/chrome-win32/chrome.exe'
  });
  const page = await browser.newPage();

  await page.setViewport({
  	width: 800,
  	height: 1080
  });

  await page.goto(
    'https://wenku.baidu.com/view/34f6b62053d380eb6294dd88d0d233d4b14e3f9e.html?from=search'
  );

  await page.click('.banner-more-btn .goBtn');

  const pageLength = await page.$eval('body', (res) => {
    return [...new Set(res.querySelectorAll('.reader-page'))].length;
    document.querySelector(`#pageNo-1`).scrollIntoView();
  });
  const results = [];

  for (let i = 1; i <= pageLength; i++) {
    const result = await page.$eval(`#pageNo-${i}`, (res) => {
      const text = document.querySelector(`#pageNo-${i} .reader-txt-layer`).innerText;
      document.documentElement.scrollTop += 1033;
      // document.querySelector(`#pageNo-${i + 1}`).scrollIntoView();

      return text;
    });
    results.push(result);
  }

  console.log(results.length);
  console.log(results);

  // await browser.close();
})();
