const algo = require('./algorithm.js');

// 对输入的字符串所有字符进行无序组合（不考虑重复字符）
console.log(algo.anagrams('abc'));

// 根据输入的数组输出所有无序组合可能
console.log(algo.traverseDisorderList(['a', 'b', 'c'], ['d', 'e'], ['f', 'g']));

// 求出字符串中各个字符出现频率
console.log(algo.charFrequency('fadjlfjalgdoahobhq'));