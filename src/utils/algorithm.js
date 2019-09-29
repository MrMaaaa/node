/**
 * 对输入的字符串所有字符进行无序组合 例:'abc' => [ 'abc', 'acb', 'bac', 'bca', 'cab', 'cba' ]
 * @param {String} string 要进行组合的字符串
 * @return {Array} 所有无序组合
 */
const anagrams = (string) => {
  if (string.length <= 2)
    return string.length === 2 ? [string, string[1] + string[0]] : [string];

  return string
    .split('')
    .reduce(
      (acc, letter, i) =>
        acc.concat(
          anagrams(string.slice(0, i) + string.slice(i + 1)).map(
            (val) => letter + val,
          ),
        ),
      [],
    );
};

/**
 * 对输入的字符串数组进行无序组合 例:['hello', 'world', '!'] => [ 'helloworld!', 'hello!world', 'worldhello!', 'world!hello', '!helloworld', '!worldhello' ]
 * @param {String} arr 要进行组合的字符串
 * @return {Array} 所有无序组合
 */
const anagramsArray = (arr) => {
  if (arr.length <= 2)
    return arr.length === 2 ? [arr[0] + arr[1], arr[1] + arr[0]] : arr;

  return arr.reduce((acc, cur, idx) => {
    return acc.concat(
      anagramsArray(arr.slice(0, idx).concat(arr.slice(idx + 1))).map(
        (el) => cur + el,
      ),
    );
  }, []);
};

/**
 * 根据输入的数组输出所有无序组合可能
 * @param {Array} arrays 要进行组合的数组
 * @return {Array} 所有无序组合
 */
const traverseDisorderList = (...arrays) => {
  return arrays.reduce((acc, value) => {
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
 * @param {String} string 字符串
 * @return {Object} 以每个字符为key的对象
 */
const charFrequency = (string) => {
  return string.split('').reduce((acc, value) => {
    acc[value] = acc[value] ? acc[value] + 1 : 1;
    return acc;
  }, {});
};

/**
 * 汉诺塔
 * @param {Number} n 汉诺塔盘数
 * @param {String} from 汉诺塔1柱
 * @param {String} buffer 汉诺塔2柱
 * @param {String} to 汉诺塔3柱
 */
const hannoi = (n, from, buffer, to) => {
  if (n === 0) return;

  hannoi(n - 1, from, to, buffer);
  console.log(`Move disk ${n} from ${from} to ${to}\n`);
  hannoi(n - 1, buffer, from, to);
};

exports = module.exports = {
  anagrams,
  anagramsArray,
  traverseDisorderList,
  charFrequency,
  hannoi,
};
