const puppeteer = require('puppeteer');
const fs = require('fs');

const PAGE = 'https://a.jd.com';

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();

  await page.goto(PAGE);

  await page.evaluate((body) => {
    document.documentElement.scrollTop = document.body.clientHeight;
  });

  await page.content();

  const results = await page.$eval('body', (body) => {
    document.documentElement.scrollTop = document.body.clientHeight;
    return {
      body: [...body.querySelectorAll('#quanlist > .quan-item')].map((item) => {
        return {
          name: item.querySelector('.q-price').innerText,
          range: item.querySelector('.q-range').innerText,
          process:
            item.querySelector('.q-progress') ?
            item.querySelector('.q-progress').innerText.replace(/\n/g, '') : `开始时间：${item.querySelector('.count-time .quan-time').dataset.end}`
        };
      })
    };
  });

  const writer = fs.createWriteStream('../../node_test/jd_discount.txt');
  writer.write(`优惠券地址：${PAGE}\n`, 'utf8');
  results.body.map((res) => {
    writer.write(`优惠券：${res.name}\n`, 'utf8');
    writer.write(`范围：${res.range}\n`, 'utf8');
    writer.write(`进度：${res.process}\n\n`, 'utf8');
  });
  writer.close();

  await browser.close();
})();