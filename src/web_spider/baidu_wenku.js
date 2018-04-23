const HCCrawler = require('headless-chrome-crawler');

let isClick = true;

(async () => {
  const crawler = await HCCrawler.launch({
    evaluatePage: () => {
      let results = '';

      // 这里需要模拟点击加载更多的按钮，然后爬取页面数据
      $('.banner-more-btn .goBtn')[0].click();

      $('.reader-word-layer').each((index, item) => {
        results += $(item).text();
      });
      return results;
    },
    onSuccess: (result) => {
      console.log(result.result);
    },
    onError: (error) => {
      console.dir(error);
    }
  });

  await crawler.queue({
    obeyRobotsTxt: false, // 忽略网站的robots.txt设置
    url:
      'https://wenku.baidu.com/view/34f6b62053d380eb6294dd88d0d233d4b14e3f9e.html?from=search',
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.117 Safari/537.36'
  });
  await crawler.onIdle();
  await crawler.close();
})();
