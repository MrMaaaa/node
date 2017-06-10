var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var iconv = require('iconv-lite');

const HOME_PRE = 'https://a.jd.com';



var options = {
  url: HOME_PRE,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3107.5 Safari/537.36'
  },
  encoding: null
};

//京东需先解决登录问题
request(options, function(err, res, body) {
  var $ = cheerio.load(body, {
    ignoreWhitespace: true,
    xmlMode: true
  });

  var lists = [];
  var results = $('body');
  results.each(function(index, elem) {
    lists.push({
      price: $(this).find('.q-type .q-price strong').text(),
      limit: $(this).find('.q-type .q-price .q-limit').text(),
      range: $(this).find('.q-type .q-range').text(),
      process: $(this).find('.q-type .q-ops-box .q-progress .txt').text()
    });
  });

  console.log(results.text());

  /*(function writer(j) {
    var data = '【' + (j + 1) + '】' + lists[j].price + '  ' + lists[j].limit + '\n' + lists[j].range + '  ' + lists[j].process + '\n\n';
    fs.appendFile('京东优惠券.txt', data, {
      encoding: 'UTF8'
    }, function() {
      if (j + 1 < lists.length) {
        writer(j + 1);
      } else {
        console.log('finish');
        console.log('total:' + lists.length);
      }
    });
  })(0);*/
});
