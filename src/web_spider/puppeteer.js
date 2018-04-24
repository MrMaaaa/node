const puppeteer = require('puppeteer');

let isClick = false;
let timeout = null;

(async () => {
  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();

  page.on('request', (res) => {
    console.log(isClick);
    if (isClick) {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        const body = await page.$('body');
        const results = await page.evaluate((body) => {
          document.documentElement.scrollTop = body.clientHeight;
          return {
            body: [...body.querySelectorAll('.reader-word-layer')]
              .map((item) => item.innerText)
              .join('')
          };
        }, body);
        console.log('result: ', results);

        await browser.close();
      }, 1000);
    }
  });

  await page.goto(
    'https://wenku.baidu.com/view/34f6b62053d380eb6294dd88d0d233d4b14e3f9e.html?from=search'
  );

  isClick = true;
  await page.click('.banner-more-btn .goBtn');
})();
