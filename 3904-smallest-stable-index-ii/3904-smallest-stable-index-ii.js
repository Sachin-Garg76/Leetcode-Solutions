/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var firstStableIndex = function(nums, k) {
       const n = nums.length;

    // suffixMin[i] = minimum value from i to n - 1
    const suffixMin = new Array(n);
    suffixMin[n - 1] = nums[n - 1];

    for (let i = n - 2; i >= 0; i--) {
        suffixMin[i] = Math.min(nums[i], suffixMin[i + 1]);
    }

    // Keep track of max(nums[0..i])
    let prefixMax = -Infinity;

    for (let i = 0; i < n; i++) {
        prefixMax = Math.max(prefixMax, nums[i]);

        const instability = prefixMax - suffixMin[i];

        if (instability <= k) {
            return i;
        }
    }

    return -1;

};