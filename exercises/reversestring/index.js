// --- Directions
// Given a string, return a new string with the reversed
// order of characters
// --- Examples
//   reverse('apple') === 'leppa'
//   reverse('hello') === 'olleh'
//   reverse('Greetings!') === '!sgniteerG'

function reverse(str) {
  return str.split('').reverse().join('');
}

function reverseOther(str) {
  let reversed = '';

  for(let char of str) {
    reversed = char + reversed;
  }
  return reversed;
}

function reverseOther2(str) {
  return str.split('')
    .reduce((reversed, value) =>  value + reversed, '');
}

module.exports = reverse;
//module.exports = reverseOther;
//module.exports = reverseOther2;