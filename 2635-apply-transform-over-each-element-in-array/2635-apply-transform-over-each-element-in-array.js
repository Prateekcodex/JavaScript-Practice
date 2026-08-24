/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var map = function(arr, fn) {
    const returnedArray = [];
    for (let i = 0; i < arr.length; i++) {
        returnedArray.push(fn(arr[i], i));
    }
    return returnedArray;
};

/**
 * const arr = [1, 2, 3];
 * const plusone = function plusOne(n) { return n + 1; };
 * map(arr, plusone); // [2, 3, 4]
 */