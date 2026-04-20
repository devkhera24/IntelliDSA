export const PROBLEMS = [
	{
		id: 'two-sum',
		title: 'Two Sum',
		slug: 'two-sum',
		difficulty: 'easy',
		category: 'arrays',
		companies: ['Google', 'Amazon', 'Meta'],
		timeLimit: 1200,
		prompt: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:
  Input: nums = [2,7,11,15], target = 9
  Output: [0,1]
  Explanation: nums[0] + nums[1] = 2 + 7 = 9

Constraints:
  - 2 <= nums.length <= 10^4
  - -10^9 <= nums[i] <= 10^9
  - Only one valid answer exists`,
		starterCode: `function twoSum(nums, target) {
  // Your solution here
}`,
		hints: [
			'Consider using a hash map to store complements',
			'For each element, check if target - element exists in your map',
		],
		expectedConcepts: ['hash map', 'O(n) time complexity', 'complement lookup'],
		commonMistakes: [
			'Using O(n²) brute force without discussing optimization',
			'Not handling the case where the same index is used twice',
			'Forgetting to return indices, not values',
		],
	},
	{
		id: 'valid-parentheses',
		title: 'Valid Parentheses',
		slug: 'valid-parentheses',
		difficulty: 'easy',
		category: 'strings',
		companies: ['Google', 'Meta', 'Amazon'],
		timeLimit: 1200,
		prompt: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
  1. Open brackets must be closed by the same type of brackets.
  2. Open brackets must be closed in the correct order.
  3. Every close bracket has a corresponding open bracket.

Example:
  Input: s = "()[]{}"
  Output: true

  Input: s = "(]"
  Output: false`,
		starterCode: `function isValid(s) {
  // Your solution here
}`,
		hints: [
			'Think about what data structure preserves order of opening brackets',
			'A stack is ideal here',
		],
		expectedConcepts: ['stack', 'bracket matching', 'hash map for pairs'],
		commonMistakes: ['Not handling empty string', 'Returning true when stack is non-empty at end'],
	},
	{
		id: 'reverse-linked-list',
		title: 'Reverse Linked List',
		slug: 'reverse-linked-list',
		difficulty: 'easy',
		category: 'trees',
		companies: ['Amazon', 'Microsoft', 'Apple'],
		timeLimit: 1200,
		prompt: `Given the head of a singly linked list, reverse the list, and return the reversed list.

Example:
  Input: head = [1,2,3,4,5]
  Output: [5,4,3,2,1]

Constraints:
  - The number of nodes in the list is in range [0, 5000]
  - -5000 <= Node.val <= 5000

Follow up: Can you solve it iteratively AND recursively?`,
		starterCode: `function reverseList(head) {
  // Your solution here
}`,
		hints: [
			'Keep track of prev, curr, and next pointers',
			'Be careful about the null check at the end',
		],
		expectedConcepts: ['pointer manipulation', 'iterative reversal', 'recursive approach'],
		commonMistakes: ['Losing reference to next node before updating', 'Not returning the new head'],
	},
	{
		id: 'binary-search',
		title: 'Binary Search',
		slug: 'binary-search',
		difficulty: 'easy',
		category: 'arrays',
		companies: ['Google', 'Stripe'],
		timeLimit: 1200,
		prompt: `Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, return its index. Otherwise, return -1.

Example:
  Input: nums = [-1,0,3,5,9,12], target = 9
  Output: 4

Constraints:
  - 1 <= nums.length <= 10^4
  - All integers in nums are unique
  - nums is sorted in ascending order`,
		starterCode: `function search(nums, target) {
  // Your solution here
}`,
		hints: [
			'Think about the midpoint calculation to avoid integer overflow',
			'When does left === right?',
		],
		expectedConcepts: ['binary search', 'O(log n)', 'integer overflow prevention'],
		commonMistakes: ['Off-by-one errors on left/right bounds', 'Infinite loop when not updating pointers'],
	},
	{
		id: 'maximum-subarray',
		title: 'Maximum Subarray',
		slug: 'maximum-subarray',
		difficulty: 'medium',
		category: 'dynamic programming',
		companies: ['Amazon', 'Google', 'Microsoft'],
		timeLimit: 1800,
		prompt: `Given an integer array nums, find the subarray with the largest sum, and return its sum.

Example:
  Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
  Output: 6
  Explanation: The subarray [4,-1,2,1] has the largest sum 6.

Constraints:
  - 1 <= nums.length <= 10^5
  - -10^4 <= nums[i] <= 10^4

Follow up: Can you solve it in O(n) time?`,
		starterCode: `function maxSubArray(nums) {
  // Your solution here
}`,
		hints: [
			"Kadane's Algorithm: at each element, decide: extend current subarray or start fresh?",
			'Track both current sum and global max',
		],
		expectedConcepts: ["Kadane's algorithm", 'dynamic programming', 'O(n) solution'],
		commonMistakes: ['Not handling all-negative arrays', 'Initializing maxSum to 0 instead of nums[0]'],
	},
	{
		id: 'climbing-stairs',
		title: 'Climbing Stairs',
		slug: 'climbing-stairs',
		difficulty: 'easy',
		category: 'dynamic programming',
		companies: ['Amazon', 'Google'],
		timeLimit: 1200,
		prompt: `You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

Example:
  Input: n = 3
  Output: 3
  Explanation: 1+1+1, 1+2, 2+1

Constraints:
  - 1 <= n <= 45`,
		starterCode: `function climbStairs(n) {
  // Your solution here
}`,
		hints: ['This is essentially Fibonacci', 'Define dp[i] as the number of ways to reach step i'],
		expectedConcepts: ['dynamic programming', 'Fibonacci pattern', 'space optimization to O(1)'],
		commonMistakes: ['Recursive without memoization = TLE', 'Not recognizing the Fibonacci pattern'],
	},
	{
		id: 'number-of-islands',
		title: 'Number of Islands',
		slug: 'number-of-islands',
		difficulty: 'medium',
		category: 'graphs',
		companies: ['Amazon', 'Google', 'Meta'],
		timeLimit: 1800,
		prompt: `Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.

Example:
  Input: grid = [
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
  ]
  Output: 3`,
		starterCode: `function numIslands(grid) {
  // Your solution here
}`,
		hints: [
			'Use DFS or BFS to "sink" each island after discovering it',
			'Mark visited cells as "0" to avoid revisiting',
		],
		expectedConcepts: ['DFS/BFS', 'graph traversal', 'matrix traversal'],
		commonMistakes: ['Not handling edge cases (empty grid)', 'Stack overflow with large grids (prefer BFS)'],
	},
	{
		id: 'merge-intervals',
		title: 'Merge Intervals',
		slug: 'merge-intervals',
		difficulty: 'medium',
		category: 'arrays',
		companies: ['Google', 'Meta', 'Stripe'],
		timeLimit: 1800,
		prompt: `Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

Example:
  Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
  Output: [[1,6],[8,10],[15,18]]

Constraints:
  - 1 <= intervals.length <= 10^4`,
		starterCode: `function merge(intervals) {
  // Your solution here
}`,
		hints: ['Sort intervals by start time first', 'Compare current interval start with last merged interval end'],
		expectedConcepts: ['sorting', 'interval merging logic', 'greedy approach'],
		commonMistakes: ['Forgetting to sort first', 'Off-by-one on overlap condition (>= vs >)'],
	},
	{
		id: 'longest-substring-without-repeating',
		title: 'Longest Substring Without Repeating Characters',
		slug: 'longest-substring',
		difficulty: 'medium',
		category: 'strings',
		companies: ['Amazon', 'Google', 'Microsoft'],
		timeLimit: 1800,
		prompt: `Given a string s, find the length of the longest substring without repeating characters.

Example:
  Input: s = "abcabcbb"
  Output: 3
  Explanation: "abc" is the longest substring without repeating characters.`,
		starterCode: `function lengthOfLongestSubstring(s) {
  // Your solution here
}`,
		hints: ['Sliding window with a Set or Map', 'Track the last seen index of each character'],
		expectedConcepts: ['sliding window', 'hash map', 'O(n) time'],
		commonMistakes: ['O(n²) brute force', 'Not shrinking window correctly when duplicate found'],
	},
	{
		id: 'coin-change',
		title: 'Coin Change',
		slug: 'coin-change',
		difficulty: 'medium',
		category: 'dynamic programming',
		companies: ['Amazon', 'Google', 'Stripe'],
		timeLimit: 1800,
		prompt: `You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

Example:
  Input: coins = [1,5,11], amount = 15
  Output: 3`,
		starterCode: `function coinChange(coins, amount) {
  // Your solution here
}`,
		hints: [
			'Bottom-up DP: dp[i] = min coins to make amount i',
			'Initialize dp array with amount+1 (representing infinity)',
		],
		expectedConcepts: ['dynamic programming', 'bottom-up approach', 'initialization trick'],
		commonMistakes: ['Greedy approach fails for non-canonical coin systems', 'Not handling -1 case'],
	},
	{
		id: 'word-search',
		title: 'Word Search',
		slug: 'word-search',
		difficulty: 'medium',
		category: 'graphs',
		companies: ['Amazon', 'Microsoft'],
		timeLimit: 2700,
		prompt: `Given an m x n grid of characters board and a string word, return true if word exists in the grid. The word can be constructed from letters of sequentially adjacent cells (horizontally or vertically). The same letter cell may not be used more than once.

Example:
  Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
  Output: true`,
		starterCode: `function exist(board, word) {
  // Your solution here
}`,
		hints: ['DFS with backtracking', 'Mark cells as visited temporarily, restore after recursion'],
		expectedConcepts: ['backtracking', 'DFS', 'visited tracking'],
		commonMistakes: ['Forgetting to unmark cells after backtracking', 'Not checking bounds'],
	},
	{
		id: 'lru-cache',
		title: 'LRU Cache',
		slug: 'lru-cache',
		difficulty: 'hard',
		category: 'arrays',
		companies: ['Google', 'Amazon', 'Meta', 'Microsoft'],
		timeLimit: 2700,
		prompt: `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:
  - LRUCache(int capacity): Initialize the LRU cache with positive size capacity.
  - int get(int key): Return the value of the key if the key exists, otherwise return -1.
  - void put(int key, int value): Update or insert. If cache is at capacity, evict least recently used.

Both operations must run in O(1) average time complexity.`,
		starterCode: `class LRUCache {
  constructor(capacity) {
    // Initialize your data structure
  }

  get(key) {
    // Return value or -1
  }

  put(key, value) {
    // Insert or update
  }
}`,
		hints: [
			'Combine a HashMap with a Doubly Linked List',
			'HashMap gives O(1) lookup; DLL gives O(1) insertion/deletion',
		],
		expectedConcepts: ['doubly linked list', 'hash map', 'O(1) operations', 'cache eviction'],
		commonMistakes: ['Using an array (O(n) for eviction)', 'Not updating position on get'],
	},
	{
		id: 'trapping-rain-water',
		title: 'Trapping Rain Water',
		slug: 'trapping-rain-water',
		difficulty: 'hard',
		category: 'arrays',
		companies: ['Google', 'Amazon', 'Meta'],
		timeLimit: 2700,
		prompt: `Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

Example:
  Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
  Output: 6`,
		starterCode: `function trap(height) {
  // Your solution here
}`,
		hints: [
			'Two-pointer approach avoids O(n) extra space',
			'Water at any index = min(maxLeft, maxRight) - height[i]',
		],
		expectedConcepts: ['two pointers', 'prefix/suffix max arrays', 'O(n) time O(1) space'],
		commonMistakes: ['O(n²) brute force', 'Not handling empty or single element arrays'],
	},
	{
		id: 'serialize-deserialize-binary-tree',
		title: 'Serialize and Deserialize Binary Tree',
		slug: 'serialize-deserialize-tree',
		difficulty: 'hard',
		category: 'trees',
		companies: ['Google', 'Meta', 'Amazon'],
		timeLimit: 2700,
		prompt: `Serialization is the process of converting a data structure into a sequence of bits so that it can be stored in a file or memory buffer. Design an algorithm to serialize and deserialize a binary tree. Ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.

Note: The algorithm doesn't need to follow a particular format — just ensure serialize(deserialize(s)) produces the same tree.`,
		starterCode: `function serialize(root) {
  // Return string representation
}

function deserialize(data) {
  // Return root node
}`,
		hints: ['BFS level-order serialization is intuitive', 'Use "null" as a placeholder for missing children'],
		expectedConcepts: ['BFS/DFS traversal', 'serialization format design', 'tree reconstruction'],
		commonMistakes: ['Not handling null nodes in serialization', 'Forgetting to handle empty tree'],
	},
	{
		id: 'k-closest-points',
		title: 'K Closest Points to Origin',
		slug: 'k-closest-points',
		difficulty: 'medium',
		category: 'arrays',
		companies: ['Amazon', 'Google', 'Stripe'],
		timeLimit: 1800,
		prompt: `Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).

The distance between two points is the Euclidean distance.

Example:
  Input: points = [[1,3],[-2,2]], k = 1
  Output: [[-2,2]]`,
		starterCode: `function kClosest(points, k) {
  // Your solution here
}`,
		hints: [
			'You can compare squared distances to avoid sqrt',
			'A max-heap of size k gives O(n log k)',
		],
		expectedConcepts: ['sorting', 'heap/priority queue', 'distance formula'],
		commonMistakes: ['Using sqrt when squared distance suffices', 'Sorting entire array when k << n'],
	},
	{
		id: 'course-schedule',
		title: 'Course Schedule',
		slug: 'course-schedule',
		difficulty: 'medium',
		category: 'graphs',
		companies: ['Amazon', 'Google'],
		timeLimit: 1800,
		prompt: `There are numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

Return true if you can finish all courses. Otherwise, return false.

Example:
  Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
  Output: false
  Explanation: Cycle detected — impossible to finish.`,
		starterCode: `function canFinish(numCourses, prerequisites) {
  // Your solution here
}`,
		hints: ['Model as a directed graph, then detect cycles', 'DFS with 3 states: unvisited, visiting, visited'],
		expectedConcepts: ['topological sort', 'cycle detection', 'DFS with state'],
		commonMistakes: ['Not handling disconnected components', 'Using only 2 states (missing "visiting" state)'],
	},
	{
		id: 'find-median-data-stream',
		title: 'Find Median from Data Stream',
		slug: 'find-median-data-stream',
		difficulty: 'hard',
		category: 'arrays',
		companies: ['Google', 'Amazon'],
		timeLimit: 2700,
		prompt: `The MedianFinder class should support:
  - addNum(int num): Add integer to the data structure
  - findMedian(): Returns the median of current data

Example:
  addNum(1), addNum(2), findMedian() → 1.5
  addNum(3), findMedian() → 2.0`,
		starterCode: `class MedianFinder {
  constructor() {
    // Initialize
  }
  addNum(num) {}
  findMedian() {}
}`,
		hints: [
			'Use two heaps: a max-heap for lower half, min-heap for upper half',
			'Balance the heaps to ensure sizes differ by at most 1',
		],
		expectedConcepts: ['two heaps', 'heap balancing', 'O(log n) insert O(1) findMedian'],
		commonMistakes: ['Sorting on every insert (O(n log n))', 'Not balancing heap sizes after insertion'],
	},
	{
		id: 'design-twitter',
		title: 'Design Twitter',
		slug: 'design-twitter',
		difficulty: 'hard',
		category: 'system design',
		companies: ['Google', 'Meta', 'Amazon'],
		timeLimit: 2700,
		prompt: `Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and see the 10 most recent tweets in the user's news feed.

Implement:
  - postTweet(userId, tweetId)
  - getNewsFeed(userId) → 10 most recent tweet IDs from user + followees
  - follow(followerId, followeeId)
  - unfollow(followerId, followeeId)`,
		starterCode: `class Twitter {
  constructor() {}
  postTweet(userId, tweetId) {}
  getNewsFeed(userId) {}
  follow(followerId, followeeId) {}
  unfollow(followerId, followeeId) {}
}`,
		hints: [
			'Use a timestamp counter to order tweets',
			'getNewsFeed needs a merge of sorted tweet lists → min-heap',
		],
		expectedConcepts: ['system design', 'hash map', 'heap merge', 'timestamp ordering'],
		commonMistakes: [
			'Not considering a user sees their own tweets in feed',
			'O(n log n) instead of O(n log k) for feed',
		],
	},
	{
		id: 'longest-increasing-subsequence',
		title: 'Longest Increasing Subsequence',
		slug: 'longest-increasing-subsequence',
		difficulty: 'medium',
		category: 'dynamic programming',
		companies: ['Google', 'Amazon', 'Microsoft'],
		timeLimit: 1800,
		prompt: `Given an integer array nums, return the length of the longest strictly increasing subsequence.

Example:
  Input: nums = [10,9,2,5,3,7,101,18]
  Output: 4
  Explanation: [2,3,7,101] is the longest increasing subsequence.

Follow up: Can you come up with an algorithm that runs in O(n log n) time?`,
		starterCode: `function lengthOfLIS(nums) {
  // Your solution here
}`,
		hints: [
			'Start with O(n²) DP, then discuss binary search optimization',
			'The O(n log n) uses a patience sorting approach',
		],
		expectedConcepts: ['dynamic programming', 'binary search optimization', 'patience sorting'],
		commonMistakes: [
			'Confusing subsequence with substring',
			'Not discussing the O(n log n) optimization when asked',
		],
	},
	{
		id: 'graph-valid-tree',
		title: 'Graph Valid Tree',
		slug: 'graph-valid-tree',
		difficulty: 'medium',
		category: 'graphs',
		companies: ['Google', 'Stripe'],
		timeLimit: 1800,
		prompt: `Given n nodes labeled from 0 to n-1 and a list of undirected edges, write a function to check whether these edges make up a valid tree.

Example:
  Input: n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]
  Output: true

A valid tree has exactly n-1 edges and no cycles.`,
		starterCode: `function validTree(n, edges) {
  // Your solution here
}`,
		hints: ['A tree has exactly n-1 edges AND is fully connected', 'Use Union-Find or DFS cycle detection'],
		expectedConcepts: ['Union-Find', 'DFS cycle detection', 'tree properties'],
		commonMistakes: ['Checking only edge count (not connectivity)', 'Not handling disconnected graphs'],
	},
]
