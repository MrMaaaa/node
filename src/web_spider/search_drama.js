const readline = require('readline');
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const iconv = require('iconv-lite');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('close', () => {});

const getInput = (readline, question) => {
  return new Promise((resolve, reject) => {
    readline.question(question, (input) => {
      resolve(input);
    });
  });
};

const searchDrama = async (rl, dramaName = '') => {
  try {
    const SEARCH_URL = `https://91mjw.com/?s=${dramaName}`;

    console.log('正在查询……');

    const browser = await puppeteer.launch({
      executablePath:
        '../node_modules/puppeteer/local-chromium/chrome-win32/chrome.exe',
      headless: true,
    });
    const page = await browser.newPage();

    page.on('error', (err) => {
      console.log(err);
    });

    await page.goto(SEARCH_URL);
    await page.content();

    const results = await page.$$eval('.m-movies .u-movie > a', (res) =>
      res.map((item) => ({
        href: item.getAttribute('href'),
        name: item.getAttribute('title'),
      }))
    );

    console.log('结果：');
    console.dir(results.map((item, index) => `${index}: ${item.name}`));

    const index = await getInput(rl, '请输入序号：');
    console.log('正在查询下载链接……');
    await page.goto(results[index].href, {
      waitUntil: 'domcontentloaded',
      timeout: 1000 * 60,
    });
    await page.content();

    const downloads = await page.$$eval('#download-list li a', (res) => {
      const ed2ks = [];
      const magnets = [];
      res.map((item, index) => {
        if (index % 2 === 0) {
          ed2ks.push(item.getAttribute('href'));
        } else {
          magnets.push(item.getAttribute('href'));
        }
      });
      return {
        ed2ks,
        magnets,
      };
    });

    console.log('结果：');
    console.log('电驴合集为：');
    console.log(downloads.ed2ks.join('\n'));
    console.log('\n磁力合集为：');
    console.log(downloads.magnets.join(''));

    await browser.close();
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(0);
  }
};

getInput(rl, '请输入剧名：').then((name) => {
  searchDrama(rl, name);
});
