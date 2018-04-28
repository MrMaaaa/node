const puppeteer = require('puppeteer');
const fs = require('fs');

const PAGE = 'https://a.jd.com';

(async () => {
  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();

  await page.goto(PAGE);

  await page.evaluate((body) => {
    document.documentElement.scrollTop = document.body.clientHeight;
  });

  await page.content();

  const body = await page.$('body');
  const results = await page.evaluate((body) => {
    document.documentElement.scrollTop = document.body.clientHeight;
    return {
      body: [...body.querySelectorAll('#quanlist > .quan-item')].map((item) => {
        return {
          name: item.querySelector('.q-price').innerText,
          range: item.querySelector('.q-range').innerText,
          process:
            item.querySelector('.q-progress') &&
            item.querySelector('.q-progress').innerText
        };
      })
    };
  }, body);
  console.dir(results.body.length);

  await browser.close();
})();

//京东需先解决登录问题
// request(options, function(err, res, body) {
//   const $ = cheerio.load(body, {
//     ignoreWhitespace: true,
//     xmlMode: true
//   });

//   const lists = [];
//   const results = $('body');
//   results.each(function(index, elem) {
//     lists.push({
//       price: $(this)
//         .find('.q-type .q-price strong')
//         .text(),
//       limit: $(this)
//         .find('.q-type .q-price .q-limit')
//         .text(),
//       range: $(this)
//         .find('.q-type .q-range')
//         .text(),
//       process: $(this)
//         .find('.q-type .q-ops-box .q-progress .txt')
//         .text()
//     });
//   });

//   console.log(results.text());
// });
