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
  return quickSort(leftArray).concat(pivot).concat(quickSort(rightArray));
};