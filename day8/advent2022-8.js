const fs = require("fs");
const input = fs
  .readFileSync("input8.txt", "utf8")
  .split("\n")
  .map((row) => row.split("").filter((cell) => cell !== "\r"));

/*=============================================
=                   Part 1                   =
=============================================*/

/**
 *
 * @param {number} indexColumn
 * @param {number[][]} treeMap full map of trees
 * @returns {number[]}
 */
const buildRowFromColumn = (indexColumn, treeMap) => {
  let horizontalColumn = [];
  treeMap.forEach((row) => {
    row.forEach((cell, currentIndexColumn) => {
      if (indexColumn === currentIndexColumn) {
        horizontalColumn.push(cell);
      }
    });
  });
  return horizontalColumn;
};

/**
 * @param {number[][]} matrix
 * @see https://betterprogramming.pub/how-to-rotate-a-matrix-in-javascript-2c8a4c64b8d9
 */
const rotateCounterClockWise = (matrix) =>
  matrix
    .map((row, i) =>
      row.map((_, j) => {
        return matrix[matrix.length - 1 - j][i];
      })
    )
    .reverse()
    .map((row) => row.reverse());

/** @returns {boolean[][]} */
const buildInitialMap = () => {
  let mapVisibleTrees = [[]];
  input.forEach((row, indexR) => {
    row.forEach((_) => mapVisibleTrees[indexR].push(false));
    mapVisibleTrees.push([]);
  });
  mapVisibleTrees = mapVisibleTrees.filter((row) => row.length > 0);
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
const isVisibleVertically = (indexRow, indexColumn, treeRow = []) => {
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
 * @param {number[][]} treeMap full map of trees
 */
const isVisibleHorizontally = (indexRow, indexColumn, treeMap) => {
  const newIndexRow = treeMap[indexColumn].length - indexColumn;
  const newIndexColumn = indexRow;
  return isVisibleVertically(
    newIndexRow,
    newIndexColumn,
    treeMap[newIndexColumn]
  );
};

const getVisibleTreesCount = () => {
  let mapVisibleTrees = buildInitialMap(input);
  const counterClockWiseRotatedMap = rotateCounterClockWise(input);
  input.forEach((row, indexRow) =>
    row.forEach((_, indexColumn) => {
      if (
        isVisibleVertically(indexRow, indexColumn, row) ||
        isVisibleHorizontally(indexRow, indexColumn, counterClockWiseRotatedMap)
      ) {
        mapVisibleTrees[indexRow][indexColumn] = true;
      }
    })
  );
  return countVisibleTrees(mapVisibleTrees);
};

console.log(getVisibleTreesCount()); // 1827 too high, 1335 too low, !1398
