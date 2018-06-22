/**
 * 快速排序
 * @param {Array} array 待排序数组
 * @return {Array} 排序后数组
 */
const quickSort = (array) => {
  if (array.length <= 1) return array;

  const pivot = array[0];
  const leftArray = [];
  const rightArray = [];
  array.slice(1).forEach((element) => {
    if (element < pivot) {
      leftArray.push(element);
    } else {
      rightArray.push(element);
    }
  });
  return quickSort(leftArray)
    .concat(pivot)
    .concat(quickSort(rightArray));
};

/**
 * 冒泡排序
 * @param {Array} array 待排序数组
 * @return {Array} 排序后数组
 */
const bubbleSort = (array) => {
  const arr = new Array(...array);

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length - 1; j++) {
      if (arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
  return arr;
};

exports = module.exports = {
  quickSort,
  bubbleSort
};
