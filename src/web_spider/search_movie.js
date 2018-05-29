const puppeteer = require('puppeteer');
const fs = require('fs');
const iconv = require('iconv-lite');

// 获取输入的电影名字
const movie_name = process.argv[2] || '';

// 将名字转为gbk编码
const search = iconv.encode(movie_name, 'gbk').toString('hex').match(/.{2}/g).map((el) => '%' + el).join('').toLocaleUpperCase();

const SEARCH_URL = `http://s.ygdy8.com/plus/so.php?kwtype=0&searchtype=title&keyword=${search}`;
const HOME_URL = `http://www.ygdy8.com`;

// TODO
(async () => {
  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();

  await page.goto(SEARCH_URL);

  await page.content();

  const searchContent = await page.$eval('body', (body) => {
    return {
      link: body.querySelectorAll('.co_content8 td b a')
    };
  });

  await browser.close();
})();