const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const itemName = process.argv[2] || 'CSGO';

const originUrl = `https://www.douyu.com/directory/game/${itemName}`;
const options = {
  url: originUrl,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3107.5 Safari/537.36'
  }
};
request(options, function(err, res, body) {
  const $ = cheerio.load(body, {
    ignoreWhitespace: true,
    xmlMode: true
  });
  const lists = $('#live-list-contentbox .play-list-link');

  const writer = fs.createWriteStream(`./${itemName} results.txt`);
  lists.each(function(index, elem) {
    let $this = $(this);
    writer.write(`标题：${$this.find('.mes h3').text()}\n`, 'UTF8');
    writer.write(`主播：${$this.find('.dy-name').text()}\n`, 'UTF8');
    writer.write(`人气：${$this.find('.dy-num').text()}\n`, 'UTF8');
    writer.write('\n', 'UTF8');
  });

  writer.end();
});
