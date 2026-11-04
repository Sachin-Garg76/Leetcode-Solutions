
/**
 * @param {number[]} nums
 * @param {number} x
 * @param {number} k
 * @return {number}
 */
var minOperations = function(nums, x, k) {
    const n = nums.length;

    const values = [...new Set(nums)].sort((a, b) => a - b);
    const m = values.length;

    const index = new Map();
    for (let i = 0; i < m; i++) {
        index.set(values[i], i + 1);
    }

    const count = new Float64Array(m + 1);
    const sum = new Float64Array(m + 1);

    function update(tree, i, delta) {
        while (i <= m) {
            tree[i] += delta;
            i += i & -i;
        }
    }

    function query(tree, i) {
        let result = 0;
        while (i > 0) {
            result += tree[i];
            i -= i & -i;
        }
        return result;
    }

    function kth(kth) {
        let pos = 0;
        let bit = 1;

        while (bit * 2 <= m) bit *= 2;

        for (; bit > 0; bit >>= 1) {
            const next = pos + bit;

            if (next <= m && count[next] < kth) {
                pos = next;
                kth -= count[next];
            }
        }

        return pos + 1;
    }

    function add(num, delta) {
        const idx = index.get(num);
        update(count, idx, delta);
        update(sum, idx, num * delta);
    }

    function getCost() {
        const medianIdx = kth(Math.floor((x + 1) / 2));
        const median = values[medianIdx - 1];

        const leftCount = query(count, medianIdx);
        const leftSum = query(sum, medianIdx);

        const totalSum = query(sum, m);
        const rightCount = x - leftCount;
        const rightSum = totalSum - leftSum;

        return median * leftCount - leftSum +
               rightSum - median * rightCount;
    }

    const costs = [];

    for (let i = 0; i < x; i++) {
        add(nums[i], 1);
    }

    costs.push(getCost());

    for (let i = x; i < n; i++) {
        add(nums[i - x], -1);
        add(nums[i], 1);
        costs.push(getCost());
    }

    const INF = Infinity;

    const dp = Array.from(
        { length: n + 1 },
        () => new Float64Array(k + 1).fill(INF)
    );

    for (let i = 0; i <= n; i++) {
        dp[i][0] = 0;
    }

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= k; j++) {
            dp[i][j] = dp[i - 1][j];

            if (i >= x) {
                dp[i][j] = Math.min(
                    dp[i][j],
                    dp[i - x][j - 1] + costs[i - x]
                );
            }
        }
    }

    return dp[n][k];
};
