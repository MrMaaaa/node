var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var iconv = require('iconv-lite');

//主站
const HOME_PRE = 'http://cl.doud.pw/';
const PAGE_SIZE = 2;

var options = {
  url: HOME_PRE + 'thread0806.php?fid=15&search=&page=',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3107.5 Safari/537.36'
  },
  encoding: null
};

var lists = [];
(function run(i) {
  console.log('开始爬取数据……' + i);
  options.url = HOME_PRE + 'thread0806.php?fid=15&search=&page=' + i,
    request(options, function(err, res, body) {
      var html = iconv.decode(body, 'gbk');
      var $ = cheerio.load(html, {
        ignoreWhitespace: true,
        xmlMode: true
      });

      var nowLists = $('#ajaxtable .tr3 .tal h3 a');

      nowLists.each(function(index, elem) {
        if (index > 3) {
          lists.push({
            content: $(this).text(),
            preview_url: $(this).attr('href'),
            download_url: ''
          });
        }
      });

      i++;
      if (i <= PAGE_SIZE) {
        run(i);
      } else {
        console.log('成功爬取数据，开始写入文件……');
        // lists.forEach(function(value, index) {
        //   fs.appendFileSync('output.txt', '【' + (index + 1) + '】' + value.content + '\n' + HOME_PRE + value.url + '\n\n');
        // });
        (function writer(j) {
          var data = '【' + (j + 1) + '】' + lists[j].content + '\n' + HOME_PRE + lists[j].preview_url + '\n\n';
          fs.appendFile('output.txt', data, {
            encoding: 'UTF8'
          }, function() {
            if (j + 1 < lists.length) {
              writer(j + 1);
            } else {
              console.log('finish');
              console.log('total:' + lists.length);
            }
          });
        })(0);
      }
    });
})(1);
