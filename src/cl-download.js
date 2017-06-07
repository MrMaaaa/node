var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var iconv = require('iconv-lite');

//主站
const home = 'http://cl.doud.pw/';
var options = {
  url: home + 'thread0806.php?fid=15&search=&page=1',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3107.5 Safari/537.36'
  },
  encoding: null
};

request(options, function(err, res, body) {
  var html = iconv.decode(body, 'gbk');
  var $ = cheerio.load(html, {
    ignoreWhitespace: true,
    xmlMode: true
  });

  var lists = [];
  var nowLists = $('#ajaxtable .tr3 .tal h3 a');
  nowLists.each(function(index, elem) {
    if(index > 3) {
      console.log(index - 3);
      console.log($(this).text());
      console.log($(this).attr('href'));
    }
  });
});
