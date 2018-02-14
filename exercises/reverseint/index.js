// --- Directions
// Given an integer, return an integer that is the reverse
// ordering of numbers.
// --- Examples
//   reverseInt(15) === 51
//   reverseInt(981) === 189
//   reverseInt(500) === 5
//   reverseInt(-15) === -51
//   reverseInt(-90) === -9

function reverseInt(n) {
  const isNegative = n < 0;
  const reversed = Number(
    Math.abs(n)
      .toString()
      .split('')
      .reverse()
      .join('')
  );

  return isNegative ? -1 * reversed : reversed;
}

function reverseIntSolution(n) {
  const reversed = n.toString()
    .split('')
    .reverse()
    .join('');

  return parseInt(reversed, 10) * Math.sign(n);
}

//module.exports = reverseInt;
module.exports = reverseIntSolution;