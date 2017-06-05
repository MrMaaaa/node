var request = require('request');
var options = {
  url: 'http://www.qiushibaike.com/',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36'
  }
};
request(options, function(err, res, body) {
  var arr = /<a[^>]+>/.exec(body);
  arr = body.match(/<div class=.content[^-]+[^>]+\/div>/gi);

  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].match(/<span>.+<\/span>/)[0];
    arr[i] = arr[i].replace(/<br\/>/g, '');
    arr[i] = arr[i].replace(/<span>/, '');
    arr[i] = arr[i].replace(/<\/span>/, '');
  }
  console.log(arr.length);
  console.log(arr);
});
