const HCCrawler = require('headless-chrome-crawler');

(async () => {
  const crawler = await HCCrawler.launch({
    // Function to be evaluated in browsers
    evaluatePage: () => {
      let arr = [];
      $('.list-rs .lr-box.lr-box-nav').each((index, elem) => {
        let a = [];
        $(elem)
          .find('ul li.top-sub-category')
          .each((index, elem) => {
            a.push(
              $(elem)
                .find('a')
                .text()
                .trim()
                .replace(/\\n/g, '')
            );
          });
        arr.push({
          title: $(elem)
            .find('h2 > a')
            .text(),
          list: a
        });
      });
      return arr;
    },
    // Function to be called with evaluated results from browsers
    onSuccess: (result) => {
      console.log(result.result);
    }
  });
  // Queue a request
  await crawler.queue('http://hao.jobbole.com/');
  await crawler.onIdle(); // Resolved when no queue is left
  await crawler.close(); // Close the crawler
})();
