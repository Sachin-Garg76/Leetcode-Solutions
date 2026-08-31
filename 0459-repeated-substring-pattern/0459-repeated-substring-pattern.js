/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function(s) {
    const n = s.length;

    for (let len = 1; len <= n / 2; len++) {
        if (n % len !== 0) continue;

        const pattern = s.slice(0, len);
        const repeated = pattern.repeat(n / len);

        if (repeated === s) {
            return true;
        }
    }

    return false;
};