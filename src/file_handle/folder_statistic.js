const fs = require('fs');
const path = require('path');
const Utils = require('../../modules/utils');
// const log = console.log.bind(this);
// const dir = (...args) => {
//   return console.dir.call(this, ...args, { depth: null });
// };

/**
 * 对输入的路径中的指定文件的指定参数进行数据统计
 * @param {String} dirs 待统计目录
 * @param {Array} exts 需要进行统计的文件后缀（要加【.】），空表示全部统计
 * @param {Array} params 需要进行统计的内容
 * @param {String} type filecontent: 对内容进行匹配, filename: 对标题进行匹配
 * @return {Object}
 */
function folderStatistic({
  dirs,
  exts,
  params,
  type = 'filecontent',
  callback,
}) {
  if (!dirs) throw 'folder path empty';
  if (Utils.typeOf(exts) !== 'array') throw 'exts is not a array';
  if (Utils.typeOf(params) !== 'array') throw 'params is not a array';
  if (params.length === 0) throw 'params empty';
  // 初始化结果对象
  const results = new Map();
  params.map(
    (item) =>
      (results.set(item, {
        total: 0,
        detail: []
      }))
  );

  Utils.traverse(
    dirs,
    (pathname) => {
      // exts为空表示不判断文件类型
      if (
        exts.length === 0 ||
        exts.findIndex((value) => value === path.extname(pathname)) > -1
      ) {
        if (type === 'filecontent') {
          fs.readFile(pathname, 'utf-8', (err, data) => {
            if (err) throw err;

            for (let el of Object.keys(results)) {
              let result = null;
              if (Utils.typeOf(el) === 'regexp') {
                result = data.match(el);
              } else {
                result = data.match(
                  new RegExp(`${Utils.escapeRegExp(el)}`, `g`)
                );
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
        } else if (type === 'filename') {
          for (let el of results.keys()) {
              let result = null;
              if (Utils.typeOf(el) === 'regexp') {
                result = pathname.match(el);
              } else {
                result = pathname.match(
                  new RegExp(`${Utils.escapeRegExp(el)}`, `g`)
                );
              }

              if (result) {
                results.get(el).total += result.length;
                results.get(el).detail.push({
                  path: pathname,
                  count: result.length,
                });
              }
            }
        }
      }
    },
    () => {
      callback && callback(results);
    }
  );
}

exports = module.exports = folderStatistic;