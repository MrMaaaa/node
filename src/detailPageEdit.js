const m = require('../modules/MUtils.js');
const fs = require('fs');
const path = require('path');

const randStr = new Date().getTime();

function readHTMLInDirectory(_path) {
  return new Promise((resolve, reject) => {
    let htmls = [];
    m.traverse(_path, function(pathname) {
      if (path.extname(pathname) == '.html') {
        htmls.push(pathname);
      }
    }, () => {
      resolve(htmls);
    }, false);
  }).catch(err => {
    reject(err);
  });
}

function editNameFromHTML(htmlpath, randStr) {
  return new Promise((resolve, reject) => {
    fs.readFile(htmlpath, 'utf8', function(err, data) {
      if (err)
        return console.error(err);

      var css_reg = /css\/[^<]{1,}\.css/g;
      var js_reg = /\/pricing[^<]*\.js/g;
      var css = data.match(css_reg);
      var js = data.match(js_reg);

      css.forEach(async value => {
        value = value.replace('css\/', '');
        var newValue = value.split('.')[0] + '.' + randStr + '.css';
        data = data.replace(value, newValue);
        await fs.writeFile(htmlpath, data, () => {
          // css修改后开始修改js
          js.forEach(async value => {
            value = value.replace('\/', '');
            var newValue = value.split('.')[0] + '.' + randStr + '.js';
            data = data.replace(value, newValue);
            await fs.writeFile(htmlpath, data, () => {
              //console.log('成功')
            });
          });
        });
      });
    });
  }).catch(err => {
    reject(err);
  });
}

function editHtmls(htmls) {
  htmls.map(async value => {
    await editNameFromHTML(value, randStr);
  });

  console.log('html修改完成');
}

function renameJS(jspath, filternames = [], randStr) {
  return new Promise((resolve, reject) => {
    fs.readdir(jspath, function(err, data) {
      if (err)
        return console.error(err);
      data.forEach(async value => {
        if (new RegExp(filternames.join('|')).test(value)) {
          let oldpath = value;
          value = value.replace('\/', '');
          var newValue = value.split('.')[0] + '.' + randStr + '.js';
          let newpath = newValue;
          await fs.rename(path.join(jspath, oldpath), path.join(jspath, newpath), err => {
            console.log('js修改成功');
          });
        }
      });
    });
  }).catch(err => {
    reject(err);
  });
}

function renameCSS(jspath, filternames = [], randStr) {
  return new Promise((resolve, reject) => {
    fs.readdir(jspath, function(err, data) {
      if (err)
        return console.error(err);
      data.forEach(async value => {
        if (new RegExp(filternames.join('|')).test(value)) {
          let oldpath = value;
          value = value.replace('\/', '');
          var newValue = value.split('.')[0] + '.' + randStr + '.css';
          let newpath = newValue;
          await fs.rename(path.join(jspath, oldpath), path.join(jspath, newpath), err => {
            console.log('css修改成功');
          });
        }
      });
    });
  }).catch(err => {
    reject(err);
  });
}

readHTMLInDirectory('../').then(res => {
  // editHtmls(res);
  console.log(res);
});

// renameJS('../../../detail-page/js', ['pricing'], randStr);
// renameCSS('../../../detail-page/css', ['common'], randStr);