const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const iconv = require('iconv-lite');

const HOME_PRE = 'https://a.jd.com';

const options = {
  url: HOME_PRE,
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3107.5 Safari/537.36'
  },
  encoding: null
};

//京东需先解决登录问题
request(options, function(err, res, body) {
  const $ = cheerio.load(body, {
    ignoreWhitespace: true,
    xmlMode: true
  });

  const lists = [];
  const results = $('body');
  results.each(function(index, elem) {
    lists.push({
      price: $(this)
        .find('.q-type .q-price strong')
        .text(),
      limit: $(this)
        .find('.q-type .q-price .q-limit')
        .text(),
      range: $(this)
        .find('.q-type .q-range')
        .text(),
      process: $(this)
        .find('.q-type .q-ops-box .q-progress .txt')
        .text()
    });
  });

  console.log(results.text());
});
