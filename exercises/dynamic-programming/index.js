/**
 * Example of Dynamic Programming.
 * Related article on https://amcereijo.medium.com/real-dynamic-programming-example-with-javascript-666d54c6edf4
 */


/* Record<string, number>* */
const SERVICE_CPU_TIMES = {
  two: 2,
  seven: 7,
  three: 3,
  ten: 10,
  five: 5,
  one: 1,
  six: 6,
  eight: 8,
  nine: 9,
  four: 4,
};

/*
type Transaction = {
  benefit: number,
  service: string,
  id: string,
};

type Element = {
  totalBenefit: number,
  totalCpuTime: number,
  list: Transaction[],
};
*/

// min CPU time to be as the starting point
const MIN_CPU_TIME = Object.values(SERVICE_CPU_TIMES).reduce((min, cpuTime) => {
  return cpuTime < min ? cpuTime : min
}, Number.MAX_SAFE_INTEGER);

/**
 * Utility method for creating an "empty" Element, needed when no value exists for a position
 * @returns {Element}
 */
function getDefaultEmptyElement() {
  return { // Element
    totalBenefit: 0,
    totalCpuTime: 0,
    list: []
  };
}

/**
 * Sorting the transactions
 * @param {Transaction[]} transactions
 * @returns
 */
function sortTransactions(transactions) {
  return transactions.sort((t1, t2) => {
    if (SERVICE_CPU_TIMES[t1.service] > SERVICE_CPU_TIMES[t2.service]) {
      return 1;
    }

    if (SERVICE_CPU_TIMES[t1.service] < SERVICE_CPU_TIMES[t2.service]) {
      return -1;
    }

    if (t1.benefit > t2.benefit) {
      return 1;
    }

    if (t1.benefit < t2.benefit) {
      return -1;
    }

    return 0;
  })
}

/**
 * Find a value in the previous row based in the actual one.
 * @param {Element[][]} map
 * @param {number} actualRow
 * @param {number} column
 * @returns {Element}
 */
function getPreviousRowElement(map, actualRow, column) {
  return (map[actualRow - 1] && map[actualRow - 1][column]) || getDefaultEmptyElement()
}

/**
 *
 * @param {Element} element
 * @param {Element} actualSelected
 * @param {number} totalCpuTime
 * @returns boolean
 */
function isMoreBenefitInEqualOrLessCpuTime(element, actualSelected, totalCpuTime) {
  return element.totalBenefit >= actualSelected.totalBenefit && element.totalCpuTime <= totalCpuTime;
}

/**
 *
 * @param {Transaction[]} transactions
 * @param {number} totalCpuTime
 * @returns {Transaction[]}
 */
function getBestTransactions(transactions, totalCpuTime) {
  if (!transactions.length || totalCpuTime < MIN_CPU_TIME) {
    return [];
  }

  /* Element[][] */
  const map = []; // the matrix where we will store the calculated values
  /* Element */
  let selectedElement; // the final selected element (the best one)

  // we need to sort the transactions by  cpu time asc (in case of same cpu time by benefits asc)
  const sortedTransactions = sortTransactions(transactions);
  console.log('sortedTransactions', sortedTransactions);

  // iterate all over the transactions
  for (let i = 0; i < sortedTransactions.length; i++) {
    const actualTransaction = sortedTransactions[i];
    const actualCpuTime = SERVICE_CPU_TIMES[actualTransaction.service];
    map[i] = [];

    // for each transaction we will calculate the value for each cpu time (from the lowest to the value recevied as max)
    for (let j = MIN_CPU_TIME; j <= totalCpuTime; j++) {
      /* Element */
      let elementToAdd;

      // the value for this cpu time (j) for the previous processed transaction(i)
      const upRowElement = getPreviousRowElement(map, i, j);

      // the value for this cpu time subtracking the cpu time for the actual transaction (j - cputime) for the previous processed transaction(i)
      const upRowCpuTimeElement = getPreviousRowElement(map, i, j - actualCpuTime);

      // the new total benefit (actual transaction + value in the previous row for the remainig cpu time)
      const newTotalBenefit = actualTransaction.benefit + upRowCpuTimeElement.totalBenefit;

      // has more benefit and ok with the availble cpu time?
      if (upRowElement.totalBenefit > newTotalBenefit
        || (upRowCpuTimeElement.totalCpuTime + actualCpuTime > totalCpuTime)) {
          elementToAdd = upRowElement;
      } else {
        elementToAdd = {
          totalBenefit: newTotalBenefit,
          totalCpuTime: upRowCpuTimeElement.totalCpuTime + actualCpuTime,
          list: [...upRowCpuTimeElement.list, actualTransaction],
        }
      }

      map[i][j] = elementToAdd;

      // update the selected element when find other with more benefit
      if(!selectedElement || isMoreBenefitInEqualOrLessCpuTime(elementToAdd, selectedElement, totalCpuTime)) {
        selectedElement = elementToAdd;
      }
    }
  }

  console.log(selectedElement.totalBenefit, selectedElement.totalCpuTime)
  return selectedElement.list || [];
}


const trans  = [
  { id: 't3', benefit: 10, service: 'three' },
  { id: 't6', benefit: 4, service: 'three' },
  { id: 't9', benefit: 8, service: 'four' },
  { id: 't2', benefit: 10, service: 'five' },
  { id: 't5', benefit: 6, service: 'five' },
  { id: 't10', benefit: 3, service: 'five' },
  { id: 't1', benefit: 11, service: 'six' },
  { id: 't8', benefit: 5, service: 'seven' },
  { id: 't4', benefit: 15, service: 'eight' },
  { id: 't7', benefit: 11, service: 'eight' },
]

console.log(getBestTransactions(trans, 8));
