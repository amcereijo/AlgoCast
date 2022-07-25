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

const MIN_CPU_TIME = Object.values(SERVICE_CPU_TIMES).reduce((min, cpuTime) => {
  return cpuTime < min ? cpuTime : min
}, Number.MAX_SAFE_INTEGER);

function getDefaultEmptyElement() {
  return { // Element
    totalBenefit: 0,
    totalCpuTime: 0,
    list: []
  };
}

/**
 *
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
 *
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
  const map = [];
  /* Element */
  let selectedElement;

  const sortedTransactions = sortTransactions(transactions);
  console.log('sortedTransactions', sortedTransactions);

  for (let i = 0; i < sortedTransactions.length; i++) {
    const actualTransaction = sortedTransactions[i];
    const actualCpuTime = SERVICE_CPU_TIMES[actualTransaction.service];
    map[i] = [];

    for (let j = MIN_CPU_TIME; j <= totalCpuTime; j++) {
      /* Element */
      let elementToAdd;
      const upRowElement = getPreviousRowElement(map, i, j);
      const upRowCpuTimeElement = getPreviousRowElement(map, i, j - actualCpuTime);

      const newTotalBenefit = actualTransaction.benefit + upRowCpuTimeElement.totalBenefit;

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
