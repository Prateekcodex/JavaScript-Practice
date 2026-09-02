/**
 * @param {Object|Array} obj
 * @return {Object|Array}
 */
var compactObject = function(obj) {

    // Primitive value or null
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    // If array
    if (Array.isArray(obj)) {
        return obj
            .filter(Boolean)
            .map(compactObject);
    }

    // If object
    const result = {};

    for (const key in obj) {
        const value = compactObject(obj[key]);

        if (value) {
            result[key] = value;
        }
    }

    return result;
};