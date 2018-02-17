// --- Directions
// Check to see if two provided strings are anagrams of eachother.
// One string is an anagram of another if it uses the same characters
// in the same quantity. Only consider characters, not spaces
// or punctuation.  Consider capital letters to be the same as lower case
// --- Examples
//   anagrams('rail safety', 'fairy tales') --> True
//   anagrams('RAIL! SAFETY!', 'fairy tales') --> True
//   anagrams('Hi there', 'Bye there') --> False

function toCharLoweCaseMap(stringLine) {
  return stringLine.replace(/[^\w]/g, '').toLowerCase().split('')
    .reduce((chars, char) => {
      chars.set(char, 1 + (chars.get(char) || 0));
      return chars;
    }, new Map());
}

function anagrams(stringA, stringB) {
  const charsA = toCharLoweCaseMap(stringA);
  const charsB = toCharLoweCaseMap(stringB);

  if(charsA.size !== charsB.size) {
    return false;
  }

  for(let char of charsA.keys()) {
    if(charsA.get(char) !== charsB.get(char)) {
      return false;
    }
  }

  return true;
}

// -----------------------
function anagramsSolution2(stringA, stringB) {
  return cleanString(stringA) === cleanString(stringB);
}

function cleanString(str) {
  return str
    .replace(/[^\w]/g, '')
    .toLowerCase()
    .split('')
    .sort()
    .join('');
}

function anagramsSolution(stringA, stringB) {
  const aCharMap = buildCharMap(stringA);
  const bCharMap = buildCharMap(stringB);

  if (Object.keys(aCharMap).length !== Object.keys(bCharMap).length) {
    return false;
  }

  for (let char in aCharMap) {
    if (aCharMap[char] !== bCharMap[char]) {
      return false;
    }
  }

  return true;
}

function buildCharMap(str) {
  const charMap = {};

  for (let char of str.replace(/[^\w]/g, '').toLowerCase()) {
    charMap[char] = charMap[char] + 1 || 1;
  }

  return charMap;
}

//module.exports = anagrams;
//module.exports = anagramsSolution;
module.exports = anagramsSolution2;
