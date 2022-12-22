const fs = require("fs");
const input = fs.readFileSync("input4.txt", "utf8").split("\n");

/**
 *
 * @param {string} pair couple of sections (ex. 1-48,12-47)
 * @returns {{start1:number, start2:number, end1:number, end2:number}} { start1, end1, start2, end2 }
 */
const getPairSections = (pair) => {
  const [assignment1, assignment2] = pair.split(",");
  const [start1, end1] = assignment1.split("-").map((n) => Number(n));
  const [start2, end2] = assignment2.split("-").map((n) => Number(n));
  return { start1, end1, start2, end2 };
};

/*=============================================
=                    Part 1                   =
=============================================*/

const isFullyOverlapping = (pair) => {
  const { start1, end1, start2, end2 } = getPairSections(pair);
  if (
    (start1 <= start2 && end1 >= end2) ||
    (start2 <= start1 && end2 >= end1)
  ) {
    return true;
  }
};

const findFullOverlaps = () => {
  let count = 0;
  input.forEach((pair) => isFullyOverlapping(pair) && count++);
  return count;
};
console.log(findFullOverlaps());

/*=============================================
=                    Part 2                   =
=============================================*/

const isOverlapping = (pair) => {
  const { start1, end1, start2, end2 } = getPairSections(pair);
  if (
    (end1 >= start2 && start1 <= start2) ||
    (end2 >= start1 && start2 <= start1)
  ) {
    return true;
  }
};

const findOverlaps = () => {
  let count = 0;
  input.forEach((pair) => isOverlapping(pair) && count++);
  return count;
};

console.log(findOverlaps());
