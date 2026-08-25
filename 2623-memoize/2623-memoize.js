/**
 * @param {Function} fn
 * @return {Function}
 */
function memoize(fn) {

    const cache = new Map();

    return function(...args) {

        // Create a unique key for the arguments
        const key = JSON.stringify(args);

        // Return cached result if it exists
        if (cache.has(key)) {
            return cache.get(key);
        }

        // Call the original function
        const result = fn(...args);

        // Store the result
        cache.set(key, result);

        return result;
    };
}
