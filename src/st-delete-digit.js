import {
  NotImplementedError
} from '../extensions/index.js';

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
export default function deleteDigit(n) {
  n = String(n).split('');
  let arr = [];
  for (let i = 0; i < n.length; i++) {
    let j = n.slice(0);
    j.splice(i, 1);
    j = j.join('');
    arr.push(+j);
  }
  return Math.max(...arr);
}