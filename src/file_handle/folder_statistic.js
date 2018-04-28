const fs = require('fs');
const path = require('path');
const Utils = require('../modules/utils');
const log = console.log.bind(this);
const dir = (...args) => {
  return console.dir.call(this, ...args, { depth: null });
};

/**
 * 对输入的路径中的指定文件的指定参数进行数据统计
 * @param {String} dirs 待统计目录
 * @param {Array} exts 需要进行统计的文件后缀（要加【.】），空表示全部统计
 * @param {Array} params 需要进行统计的内容
 * @return {Object} 包含了统计内容次数及路径的对象
 */
function folderStatistic({ dirs, exts, params, callback }) {
  if (!dirs) throw 'folder path empty';
  if (Utils.typeOf(exts) !== 'array') throw 'exts is not a array';
  if (Utils.typeOf(params) !== 'array') throw 'params is not a array';
  if (params.length === 0) throw 'params empty';
  const results = {};
  params.map(
    (item) =>
      (results[item] = {
        total: 0,
        detail: []
      })
  );

  Utils.traverse(
    dirs,
    (pathname) => {
      if (
        exts.length === 0 ||
        exts.findIndex((value) => value === path.extname(pathname)) > -1
      ) {
        fs.readFile(pathname, 'utf-8', (err, data) => {
          if (err) throw err;

          for (let el of Object.keys(results)) {
            let result = null;
            if (Utils.typeOf(el) === 'regexp') {
              result = data.match(el);
            } else {
              result = data.match(new RegExp(`${Utils.escapeRegExp(el)}`, `g`));
            }

            if (result) {
              results[el].total += result.length;
              results[el].detail.push({
                path: pathname,
                count: result.length
              });
            }
          }
        });
      }
    },
    () => {
      callback && callback(results);
    }
  );
}

// example
// folderStatistic({
//   dirs: '/workspace/newbaizu/pages',
//   exts: ['.js'],
//   params: [
//     'status'
//   ],
//   callback(res) {
//     console.log(`结果：`);
//     dir(res);
//   }
// });
