/**
 * Longest Substring Without Repeating Characters


Share
Given a string s, find the length of the longest substring without repeating characters.

Example 1:

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
Example 2:

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:

Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
*/


function lengthOfLongestSubstring_leastEfficient (s) {
  let visited = {};

  let maxLength = 0;
  let maxSubstring = '';

  let accumulator = '';
  let startPosition = 0;
  let actualIndex = 0;

  while (startPosition < s.length) {
    const letter = s[actualIndex];
    if (letter && !visited[letter]) {
      visited[letter] = true;

      accumulator += letter;
      if (accumulator.length > maxLength) {
        maxSubstring = accumulator;
        maxLength = accumulator.length;
      }
      actualIndex += 1;
    } else {
      startPosition += 1;
      actualIndex = startPosition;
      visited = {};
      accumulator = '';
    }
  }

  return maxLength;
};

function lengthOfLongestSubstring_someEfficient (s) {
  //let visited = {};
  const visited = new Map();

  let maxLength = 0;

  let accumulator = '';
  let startPosition = 0;
  let actualIndex = 0;

  while (startPosition < s.length) {
    const letter = s[actualIndex];

    if (letter && !visited.has(letter)) {
      visited.set(letter, true);

      accumulator += letter;
      if (accumulator.length > maxLength) {
        maxLength = accumulator.length;
      }
      actualIndex += 1;
    } else {
      const first = accumulator[0];

      if (first === letter) {
        accumulator = accumulator.substring(1) + letter;

        if (accumulator.length > maxLength) {
          maxLength = accumulator.length;
        }

        startPosition += 1;
        actualIndex += 1;
      } else {
        startPosition += 1;
        actualIndex = startPosition;
        visited.clear();
        accumulator = '';
      }
    }
  }
  return maxLength;
};


function lengthOfLongestSubstring(s) {
  let max = 0;
  let i = 0;
  let j = i;
  const visited = new Map();

  while (i < s.length && j < s.length) {
    if (!visited.has(s[j])) {
      visited.set(s[j], true);
      j += 1;
      max = max < (j - i) ? (j - i) : max;
    } else {
      visited.delete(s[i]);
      i += 1;
    }
  }
  return max;
};

