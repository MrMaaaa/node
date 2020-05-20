const readline = require('readline');
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const iconv = require('iconv-lite');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('close', () => {});

const getInput = (readline, question) => {
  return new Promise((resolve, reject) => {
    readline.question(question, (input) => {
      resolve(input);
    }); 
  });
};

getInput(rl, '请输入电影名字：').then((name) => {
  searchMovie(name, rl);
});

const searchMovie = async (movieName = '', readline) => {
  try {
    // 将名字转为gbk编码
    const search = iconv
      .encode(movieName, 'gbk')
      .toString('hex')
      .match(/.{2}/g)
      .map((el) => '%' + el)
      .join('')
      .toLocaleUpperCase();

    const SEARCH_URL = `http://s.ygdy8.com/plus/s0.php?typeid=1&keyword=${search}`;

    console.log('正在查询……');

    const browser = await puppeteer.launch({
      headless: true
    });
    const page = await browser.newPage();
    page.on('error', (err) => {
      console.log(err);
    });

    await page.goto(SEARCH_URL);
    await page.content();

    const searchContent = await page.$$eval('.co_content8 td b > a', (res) =>
      res.map((item) => ({
        href: `http://www.ygdy8.com/${item.getAttribute('href')}`,
        name: item.innerText
      }))
    );

    if (searchContent.length === 0) {
      console.log('暂无结果');
      await browser.close();
      process.exit(0);
    }

    console.log('结果：');
    console.dir(searchContent.map((item, index) => `${index}: ${item.name}`));

    const index = await getInput(readline, '请输入序号：');
    console.log('正在查询下载链接……');
    await page.goto(searchContent[index].href, {
      waitUntil: 'domcontentloaded',
      timeout: 1000 * 60
    });
    await page.content();

    const indexContent = await page.$$eval('#Zoom table td a', (res) => {
      return res.map((item) => {
        const attrs = {};
        Object.keys(item.attributes).map((el) => {
          attrs[item.attributes[el].name] = item.attributes[el].value;
        });
        return {
          attrs,
          name: item.innerText
        };
      });
    });

    console.log('结果：');
    let sourceUrl = '';
    Object.keys(indexContent[0].attrs).map((item) => {
      if (indexContent[0].attrs[item].length > sourceUrl.length) {
        sourceUrl = indexContent[0].attrs[item];
      }
    });
    console.log(`资源名: ${indexContent[0].name}`);
    console.log(`下载地址: ${sourceUrl}`);

    await browser.close();
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
};