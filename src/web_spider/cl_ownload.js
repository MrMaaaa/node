let request = require('request');
let cheerio = require('cheerio');
let fs = require('fs');
let iconv = require('iconv-lite');

// 主站
const HOME_PRE = 'http://cc.ddder.us/';

// 爬取页数
const PAGE_START = 1;

// 爬取长度
const PAGE_SIZE = 10;

// 配置
let options = {
  url: HOME_PRE + 'thread0806.php?fid=15&search=&page=',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3107.5 Safari/537.36'
  },
  encoding: null
};

// 结果数组
let lists = [];

// 解析页面，返回获取到的数据
function parsePage(pageIndex) {
  console.log(`开始爬取第${pageIndex}页……`);
  options.url = `${HOME_PRE}thread0806.php?fid=15&search=&page=${pageIndex}`;
  return new Promise((resolve, reject) => {
    request(options, function(err, res, body) {
      if (err) {
        reject(err);
      } else {
        let html = iconv.decode(body, 'gbk');
        let $ = cheerio.load(html, {
          ignoreWhitespace: true,
          xmlMode: true
        });

        let $list = $('#ajaxtable .tr3 .tal h3 a');

        let list = [];

        $list.each(function(index, elem) {
          if (index > 3) {
            list.push({
              content: $(this).text(),
              preview_url: $(this).attr('href'),
              download_url: ''
            });
          }
        });
        console.log(`爬取第${pageIndex}页成功\n`);
        resolve(list);
      }
    });
  });
}

// 获取所有页面数据
async function getData(pageStart) {
  for (let i = 0; i < PAGE_SIZE; i++) {
    let res = await parsePage(pageStart + i);
    lists = lists.concat(res);
  }
  saveData(lists);
}

// 写入数据到指定文件
function writeToFile(data, i, path = 'cl-results.txt') {
  let result = `${i}:${data.content}\n${HOME_PRE}${data.preview_url}\n\n`;
  return new Promise((resolve, reject) => {
    fs.appendFile(path, result, {
      encoding: 'UTF8'
    }, err => {
      if(err) {
        reject(err);
      }
      resolve('write success');
    });
  });
}

// 保存获取数据
async function saveData(datas, path = 'cl-results.txt') {
  for (let i = 0; i < datas.length; i++) {
    await writeToFile(datas[i], i, path);
  }
  console.log(`数据成功写入${path}`);
}

getData(PAGE_START);