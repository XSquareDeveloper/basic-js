import {
  NotImplementedError
} from '../extensions/index.js';

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
export default function transform(arr) {
  if (!Array.isArray(arr)) throw new Error("'arr' parameter must be an instance of the Array!");

  let cloneArr = arr.slice(0);
  let result = [];
  let i = 0;

  if (arr[0] === '--discard-prev' || arr[0] === '--double-prev') i = 1;

  function discardNext(array) {
    array.splice((array.indexOf('--discard-next') + 1), 1);
  }

  function discardPrev(array) {
    array.splice((array.indexOf('--discard-prev') - 1), 1);
  }

  function doubleNext(array) {
    array[array.indexOf('--double-next')] = array[array.indexOf('--double-next') + 1];
  }

  function doublePrev(array) {
    array[array.indexOf('--double-prev')] = array[array.indexOf('--double-prev') - 1];
  }

  function cleanseArr(array) {
    for (let iterator of array) {
      if (iterator !== '--discard-next' && iterator !== '--discard-prev' && iterator !== '--double-next' && iterator !== '--double-prev') result.push(iterator);
    }
  }

  for (i; i < cloneArr.length; i++) {
    switch (arr[i]) {
      case '--discard-next':
        discardNext(cloneArr);
        break;
      case '--discard-prev':
        discardPrev(cloneArr);
        break;
      case '--double-next':
        if (arr[i] === arr[arr.length - 1]) {
          cleanseArr(cloneArr);
          return result;
        }
        doubleNext(cloneArr);
        break;
      case '--double-prev':
        doublePrev(cloneArr);
        break;
    }
  }

  cleanseArr(cloneArr);

  return result;
}