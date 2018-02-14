// --- Directions
// Given a string, return the character that is most
// commonly used in the string.
// --- Examples
// maxChar("abcccccccd") === "c"
// maxChar("apple 1231111") === "1"

function maxChar(str) {
  const map = {};
  let max = 0;
  let maxCharElement = '';

  for(let element of str) {
    map[element] = map[element] ? map[element] + 1 : 1;

    if(map[element] >  max) {
      max = map[element];
      maxCharElement = element
    }
  }

  return maxCharElement;
}

function maxCharSolution(str) {
  const charMap = {};
  let max = 0;
  let maxChar = '';

  for (let char of str) {
    if (charMap[char]) {
      charMap[char]++;
    } else {
      charMap[char] = 1;
    }
  }

  for (let char in charMap) {
    if (charMap[char] > max) {
      max = charMap[char];
      maxChar = char;
    }
  }

  return maxChar;
}

//module.exports = maxChar;
module.exports = maxCharSolution;