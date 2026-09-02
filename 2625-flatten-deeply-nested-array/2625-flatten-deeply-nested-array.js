var flat = function(arr, n) {
    const result = [];

    function flatten(array, depth) {
        for (const item of array) {
            if (Array.isArray(item) && depth > 0) {
                flatten(item, depth - 1);
            } else {
                result.push(item);
            }
        }
    }

    flatten(arr, n);

    return result;
};