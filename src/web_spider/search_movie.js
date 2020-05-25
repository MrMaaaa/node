const readline = require('readline');
const puppeteer = require('puppeteer');
const fs = require('fs');

const IS_HEADLESS = true;

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

getInput(rl, '请输入电影名字：').then((name) => {
  searchMovie(name, rl);
});

const searchMovie = async (movieName = '', readline) => {
  try {
    const browser = await puppeteer.launch({
      headless: IS_HEADLESS,
    });
    const page = await browser.newPage();
    // 这里如果把url改成变量即报错，原因未知，下同
    await page.goto('https://www.dy2018.com');
    await page.content();
    await page.type('.formhue', movieName, { delay: 100 });
    const searchPagePromise = new Promise((res) =>
      browser.once('targetcreated', (tag) => res(tag.page()))
    );
    await page.tap('.searchr input');
    const searchPage = await searchPagePromise;
    await searchPage.content();
    await searchPage.waitFor(1000);
    const searchContent = await searchPage.$$eval('b > a', (res) =>
      res.map((item) => ({
        href: `https://www.dy2018.com${item.getAttribute('href')}`,
        name: item.getAttribute('title'),
      }))
    );
    console.log('结果：');
    console.dir(searchContent.map((item, index) => `${index}: ${item.name}`));
    if (searchContent.length === 0) {
      console.log('无搜索结果');
      await browser.close();
      process.exit(0);
    }
    const index = await getInput(readline, '请输入序号：');
    await searchPage.goto(searchContent[index].href, {
      waitUntil: 'domcontentloaded',
      timeout: 3000,
    });
    await searchPage.content();
    const indexContent = await searchPage.$$eval('#Zoom table td a', (res) => {
      return res.map((item) => ({
        thunder: item.getAttribute('thunderhref'),
        ftp: item.innerText,
      }));
    });
    console.log('下载地址：');
    console.dir(indexContent);
    const isWriteToFile = await getInput(readline, '是否保存到本地？（Y/N）');
    if (isWriteToFile === 'Y' || isWriteToFile === 'y') {
      const writer = fs.createWriteStream(`./${movieName} 下载地址.txt`);
      indexContent.map((item) => {
        writer.write(`迅雷：${item.thunder}\n`, 'UTF8');
        writer.write(`FTP：${item.ftp}\n`, 'UTF8');
      });
      console.log('写入完成');
    }
    await browser.close();
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(0);
  }
};
