// 整合搜索，包括电影、美剧、日剧、韩剧资源搜索、下载
// 下载地址保存至本地

const readline = require('readline');
const puppeteer = require('puppeteer');
const fs = require('fs');

const IS_HEADLESS = true;

const URL_MAP = {
  '1': {
    name: '电影',
    url: 'https://www.dy2018.com',
    search_$$: 'b > a',
    result_$$: '#Zoom table td a',
    is_click_search_button: true,
    search_input_$$: '.formhue',
    search_button_$$: '.searchr input', // 如果不能直接访问搜索结果页面（关键字被加密），则通过模拟点击搜索按钮的方法进行跳转
    search_res_handle: (res, url) =>
      res.map((item) => ({
        href: `${url}${item.getAttribute('href')}`,
        name: item.getAttribute('title'),
      })),
    download_res_handle: (res) =>
      res.map((item) => ({
        thunder: item.getAttribute('thunderhref'),
        ftp: item.innerText,
      })),
    save_res_handle: (writer, indexContent) => {
      indexContent.map((item) => {
        writer.write(`迅雷：${item.thunder}\n`, 'UTF8');
        writer.write(`FTP：${item.ftp}\n`, 'UTF8');
      });
    },
  },
  '2': {
    name: '美剧',
    url: 'https://91mjw.com',
    search_url: 'https://91mjw.com/?s=',
    search_$$: '.m-movies .u-movie > a',
    result_$$: '#download-list li a',
    search_res_handle: (res, url) =>
      res.map((item) => ({
        href: `${item.getAttribute('href')}`,
        name: item.getAttribute('title'),
      })),
    download_res_handle: (res) => {
      const ed2ks = [];
      const magnets = [];
      res.map((item, index) => {
        // 这个网站返回的结果a标签无特殊表示，只能通过奇偶进行区别分类
        [ed2ks, magnets][index % 2].push(item.getAttribute('href'));
      });
      return {
        ed2ks,
        magnets,
      };
    },
    save_res_handle: (writer, indexContent) => {
      writer.write(`ed2k:\n\n`, 'UTF8');
      indexContent.ed2ks.map((item) => {
        writer.write(`${item}}\n`, 'UTF8');
      });
      writer.write(`\nmagents:\n\n`, 'UTF8');
      indexContent.ed2ks.map((item) => {
        writer.write(`${item}}\n`, 'UTF8');
      });
    },
  },
};

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

Object.values(URL_MAP).map((val, idx) => {
  console.log(`${idx + 1}: ${val.name}`);
});

getInput(rl, '请输入搜索类型的序号：').then((type) => {
  if (URL_MAP[type]) {
    getInput(rl, `请输入${URL_MAP[type].name}名字：`).then((name) => {
      search(name, URL_MAP[type], rl);
    });
  } else {
    console.log('请输入正确的序号');
  }
});

const search = async (searchName = '', searchInfo, readline) => {
  try {
    const browser = await puppeteer.launch({
      headless: IS_HEADLESS,
    });
    let page = await browser.newPage();
    await page.goto(searchInfo.url);
    await page.content();
    if (searchInfo.is_click_search_button) {
      await page.type(searchInfo.search_input_$$, searchName, { delay: 100 });
      const searchPagePromise = new Promise((res) =>
        browser.once('targetcreated', (tag) => res(tag.page()))
      );
      await page.tap(searchInfo.search_button_$$);
      page = await searchPagePromise;
    } else {
      await page.goto(`${searchInfo.search_url}${searchName}`);
    }
    await page.content();
    await page.waitFor(1000);
    const searchContent = await page.$$eval(
      searchInfo.search_$$,
      searchInfo.search_res_handle,
      searchInfo.url
    );
    console.log('结果：');
    console.dir(searchContent.map((item, index) => `${index}: ${item.name}`));
    if (searchContent.length === 0) {
      console.log('无搜索结果');
      await browser.close();
      process.exit(0);
    }
    const index = await getInput(readline, '请输入序号：');
    await page.goto(searchContent[index].href, {
      waitUntil: 'domcontentloaded',
    });
    await page.content();
    const indexContent = await page.$$eval(
      searchInfo.result_$$,
      searchInfo.download_res_handle
    );
    console.log('下载地址：');
    console.dir(indexContent);
    const isWriteToFile = await getInput(readline, '是否保存到本地？（Y/N）');
    if (isWriteToFile === 'Y' || isWriteToFile === 'y') {
      const writer = fs.createWriteStream(`./${searchName} 下载地址.txt`);
      searchInfo.save_res_handle(writer, indexContent);
      console.log('写入完成');
    }
    await browser.close();
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(0);
  }
};
