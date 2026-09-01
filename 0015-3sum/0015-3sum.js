/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    nums.sort((a, b) => a - b);

    const result = [];

    for (let i = 0; i < nums.length - 2; i++) {

        // Skip duplicate first elements
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        // Since array is sorted, no possible triplet
        if (nums[i] > 0) break;

        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);

                // Skip duplicates
                while (left < right && nums[left] === nums[left + 1]) {
                    left++;
                }

                while (left < right && nums[right] === nums[right - 1]) {
                    right--;
                }

                left++;
                right--;

            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }

    return result;
};