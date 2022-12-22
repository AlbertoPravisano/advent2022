const fs = require("fs");
const input = fs.readFileSync("input6.txt", "utf8").split("\n");

/*=============================================
=                   Part 1                   =
=============================================*/

/**
 * @param {number[][]} matrix
 * @see https://betterprogramming.pub/how-to-rotate-a-matrix-in-javascript-2c8a4c64b8d9
 */
const rotateCounterClockWise = (matrix) => {
  return matrix
    .map((row, i) => row.map((_, j) => matrix[matrix.length - 1 - j][i]))
    .reverse()
    .map((row) => row.reverse());
};

/**
 * @param {string[]} input
 * @returns {boolean[][]}
 */
const buildInitialMap = (input) => {
  let mapVisibleTrees = [[]];
  input.forEach((row, indexR) => {
    row.split("").forEach((_) => mapVisibleTrees[indexR].push(false));
    mapVisibleTrees.push([]);
  });
  mapVisibleTrees.filter((row) => row.length > 0);
  return mapVisibleTrees;
};

/** @param {boolean[][]} treeMap  */
const countVisibleTrees = (treeMap) => {
  let nVisibleTrees = 0;
  treeMap.forEach((row) =>
    row.forEach((cell) => cell === true && nVisibleTrees++)
  );
  return nVisibleTrees;
};

/**
 *
 * @param {number} treeHeight value of the scanned tree
 * @param {number[]} otherTrees trees in the same line of the currently scanned
 */
const checkHeightTrees = (treeHeight, otherTrees) => {
  let isHigher = true;
  otherTrees.forEach((otherTreeInLine) => {
    if (otherTreeInLine > treeHeight) {
      isHigher = false;
    }
  });
  return isHigher;
};

/**
 *
 * @param {number[]} treeRow
 * @param {number} indexColumn
 * @returns
 */
const excludeCurrentTreeFromRow = (treeRow, indexColumn) =>
  treeRow.filter((_, index) => index !== indexColumn);

/**
 *
 * @param {number} indexRow
 * @param {number} indexColumn
 * @param {number[]} treeRow full row of trees
 */
const isVisibleVertical = (indexRow, indexColumn, treeRow) => {
  if (indexRow === 0 || indexRow === treeRow.length) {
    return true;
  } else {
    const currentTreeHeight = treeRow[indexColumn];
    const otherTreesInLine = excludeCurrentTreeFromRow(treeRow, indexColumn);
    const isCurrentTreeHeigher = checkHeightTrees(
      currentTreeHeight,
      otherTreesInLine
    );
    return isCurrentTreeHeigher;
  }
};

/**
 *
 * @param {number} indexRow
 * @param {number} indexColumn
 * @param {string[]} treeMap full map of trees
 */
const isVisibleHorizontal = (indexRow, indexColumn, treeMap) => {
  const invertedTreeMap = rotateCounterClockWise(treeMap);
  const newIndexRow = invertedTreeMap[indexColumn].length - indexColumn;
  const newIndexColumn = indexRow;
  return isVisibleVertical(
    newIndexRow,
    newIndexColumn,
    invertedTreeMap[newIndexColumn].split("")
  );
};

const getVisibleTreesCount = () => {
  let mapVisibleTrees = buildInitialMap(input);
  input.forEach((row, indexRow) =>
    row.split("").forEach((_, indexColumn) => {
      if (
        isVisibleVertical(indexRow, indexColumn, row.split("")) ||
        isVisibleHorizontal(indexRow, indexColumn, input)
      ) {
        mapVisibleTrees[indexRow][indexColumn] = true;
      }
    })
  );
  return countVisibleTrees(mapVisibleTrees);
};

console.log(getVisibleTreesCount());
