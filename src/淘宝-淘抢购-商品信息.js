var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var iconv = require('iconv-lite');

const HOME_PRE = 'https://qiang.taobao.com/?spm=a21bo.50862.201859.4.AJTHsT';

var options = {
  url: HOME_PRE,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3107.5 Safari/537.36'
  },
  encoding: null
};

request(options, function(err, res, body) {
  var $ = cheerio.load(body, {
    ignoreWhitespace: true,
    xmlMode: true
  });

  var lists = [];
  var results = $('.container .content .limit-box .qg-limit-list a');
  results.each(function(index, elem) {
    lists.push({
      des: $(this).find('.qg-detail .name .des').text(),
      title: $(this).find('.qg-detail .name .subtitle').text(),
      originalPrice: $(this).find('.qg-detail .link .original-price i').text(),
      promoPrice: $(this).find('.qg-detail .link .promo-price em').text(),
      progress: $(this).find('.qg-detail .process .process-text .percent').text(),
      url: 'https:' + $(this).attr('href')
    });
  });

  (function writer(j) {
    var data = '【' + (j + 1) + '】' + lists[j].des + '  ' + lists[j].title + '\n原价' + lists[j].originalPrice + '  ' + '现价' + lists[j].promoPrice + '  ' + lists[j].progress + '\n' + lists[j].url + '\n\n';
    fs.appendFile('淘宝-淘抢购-商品信息.txt', data, {
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

});
