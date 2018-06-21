/**
 * 对输入的字符串所有字符进行无序组合（不考虑重复字符）
 * @param {String} str 要进行组合的字符串
 * @return {Array} 所有无序组合
 */
const anagrams = (str) => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split('')
    .reduce(
      (acc, letter, i) =>
        acc.concat(
          anagrams(str.slice(0, i) + str.slice(i + 1)).map(
            (val) => letter + val
          )
        ),
      []
    );
};

/**
 * 根据输入的数组输出所有无序组合可能
 * @param {Array} args 要进行组合的数组
 * @return {Array} 所有无序组合
 */
const traverseDisorderList = (...args) => {
  return args.reduce((acc, value) => {
    const arr = [];
    value.map((val) => {
      acc.map((ac) => {
        arr.push([...ac, val]);
      });
    });
    return arr;
  });
};

/**
 * 求出字符串中各个字符出现频率
 * @param {String} str 字符串
 * @return {Object} 以每个字符为key的对象
 */
const charFrequency = (str) => {
  return str.split('').reduce((acc, value) => {
    acc[value] = acc[value] ? acc[value] + 1 : 1;
    return acc;
  }, {});
};

/**
 * 汉诺塔
 * @param {Number} n 汉诺塔盘数
 * @param {*} from  汉诺塔1柱
 * @param {*} buffer 汉诺塔2柱
 * @param {*} to 汉诺塔3柱
 */
const hannoi = (n, from, buffer, to) => {
  if (n === 0) return;

  hannoi(n - 1, from, to, buffer);
  console.log(`Move disk ${n} from ${from} to ${to}\n`);
  hannoi(n - 1, buffer, from, to);
};

exports = module.exports = {
  anagrams,
  traverseDisorderList,
  charFrequency,
  hannoi,
};
