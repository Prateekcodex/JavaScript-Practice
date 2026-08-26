var TimeLimitedCache = function() {
    this.cache = new Map();
};

TimeLimitedCache.prototype.set = function(key, value, duration) {
    const currentTime = Date.now();

    const existing = this.cache.get(key);

    // Key already exists and has not expired
    if (existing && existing.expiry > currentTime) {
        clearTimeout(existing.timer);

        existing.value = value;
        existing.expiry = currentTime + duration;

        existing.timer = setTimeout(() => {
            this.cache.delete(key);
        }, duration);

        return true;
    }

    // New key
    const timer = setTimeout(() => {
        this.cache.delete(key);
    }, duration);

    this.cache.set(key, {
        value: value,
        expiry: currentTime + duration,
        timer: timer
    });

    return false;
};

TimeLimitedCache.prototype.get = function(key) {
    const item = this.cache.get(key);

    if (!item) {
        return -1;
    }

    if (item.expiry <= Date.now()) {
        clearTimeout(item.timer);
        this.cache.delete(key);
        return -1;
    }

    return item.value;
};

TimeLimitedCache.prototype.count = function() {
    const currentTime = Date.now();
    let count = 0;

    for (const [key, item] of this.cache) {
        if (item.expiry > currentTime) {
            count++;
        } else {
            clearTimeout(item.timer);
            this.cache.delete(key);
        }
    }

    return count;
};