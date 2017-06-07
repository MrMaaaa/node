var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var originUrl = 'https://www.douyu.com/directory/game/CSGO';
var originUrl1 = 'http://www.qiushibaike.com/text';
var originUrl2 = 'http://www.qiushibaike.com';
var options = {
  url: originUrl,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3107.5 Safari/537.36'
  }
};
request(options, function(err, res, body) {
  var $ = cheerio.load(body, {
    ignoreWhitespace: true,
    xmlMode: true
  });
  var lists = $('#live-list-contentbox .play-list-link');
  var results = [];

  var writer = fs.createWriteStream('./dota2 data.txt');
  lists.each(function(index, elem) {
    var $this = $(this);
    writer.write('标题：【' + $this.find('.mes h3').text() + '】\n', 'UTF8');
    writer.write('主播：【' + $this.find('.dy-name').text() + '】  人数：【' + $this.find('.dy-num').text() + '】\n', 'UTF8');
    writer.write('\n', 'UTF8');
    results.push({
      html: $this.html(),
      title: $this.find('.mes h3').text(),
      name: $this.find('.dy-name').text(),
      num: $this.find('.dy-num').text()
    });
  });

  writer.end();
});
