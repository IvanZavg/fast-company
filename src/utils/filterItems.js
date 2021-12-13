export function filterItems({ arr, value, propValue, ifEmptyReturnPrev }) {
  const newArr = arr.filter((item) => {
    if (propValue) {
      return item[propValue] === value;
    } else {
      return item === value;
    }
  });

  if (!newArr.length && ifEmptyReturnPrev) {
    return arr;
  } else {
    return newArr;
  }
}
