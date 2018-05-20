const puppeteer = require('puppeteer');
const fs = require('fs');

const PAGE = 'https://a.jd.com';

(async () => {
  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();

  await page.goto(PAGE);

  await page.evaluate((body) => {
    document.documentElement.scrollTop = document.body.clientHeight;
  });

  await page.content();

  const body = await page.$('body');
  const results = await page.evaluate((body) => {
    document.documentElement.scrollTop = document.body.clientHeight;
    return {
      body: [...body.querySelectorAll('#quanlist > .quan-item')].map((item) => {
        return {
          name: item.querySelector('.q-price').innerText,
          range: item.querySelector('.q-range').innerText,
          process:
            item.querySelector('.q-progress') &&
            item.querySelector('.q-progress').innerText
        };
      })
    };
  }, body);
  console.dir(results.body.length);

  await browser.close();
})();