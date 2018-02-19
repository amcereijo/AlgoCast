// --- Directions
// Write a function that accepts an integer N
// and returns a NxN spiral matrix.
// --- Examples
//   matrix(2)
//     [[1, 2],
//     [4, 3]]
//   matrix(3)
//     [[1, 2, 3],
//     [8, 9, 4],
//     [7, 6, 5]]
//  matrix(4)
//     [[1,   2,  3, 4],
//     [12, 13, 14, 5],
//     [11, 16, 15, 6],
//     [10,  9,  8, 7]]

function matrix(n) {
  const result = [];
  let startValue = 1;
  let filledRow = 0;
  let filledColumn = filledRow + 1;

  while (startValue <= n*n) {
    for(let i = filledRow; i < n-filledRow; i++) {
      result[filledRow] = result[filledRow] || [];
      result[filledRow][i] = startValue ++;
    } // filled row forward
    filledRow ++;

    for(let j = filledColumn; j < n -(filledColumn-1); j++) {
      result[j] = result[j] || [];
      result[j][n-filledColumn] = startValue ++;
    } // filled column forward
    filledColumn ++;

    for(let i = n-filledColumn; i >= filledRow - 1; i--) {
      result[n-filledRow] = result[n-filledRow] || [];
      result[n-filledRow][i] = startValue ++;
    }//filled row backward

    for(let j = n-filledColumn; j > filledRow - 1; j--) {
      result[j] = result[j] || [];
      result[j][filledRow - 1] = startValue ++;
    } // filled column backward
  }

  return result;

}

function matrixSolution(n) {
  const results = [];

  for (let i = 0; i < n; i++) {
    results.push([]);
  }

  let counter = 1;
  let startColumn = 0;
  let endColumn = n - 1;
  let startRow = 0;
  let endRow = n - 1;
  while (startColumn <= endColumn && startRow <= endRow) {
    // Top row
    for (let i = startColumn; i <= endColumn; i++) {
      results[startRow][i] = counter;
      counter++;
    }
    startRow++;

    // Right column
    for (let i = startRow; i <= endRow; i++) {
      results[i][endColumn] = counter;
      counter++;
    }
    endColumn--;

    // Bottom row
    for (let i = endColumn; i >= startColumn; i--) {
      results[endRow][i] = counter;
      counter++;
    }
    endRow--;

    // start column
    for (let i = endRow; i >= startRow; i--) {
      results[i][startColumn] = counter;
      counter++;
    }
    startColumn++;
  }

  return results;
}

//module.exports = matrix;
module.exports = matrixSolution;