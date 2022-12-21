const fs = require("fs");
const input = fs.readFileSync("input4.txt", "utf8").split("\n");

/*=============================================
=                    Part 1                   =
=============================================*/

const findFullOverlaps = () => {
  let count = 0;

  input.forEach((pair) => {
    const [assignment1, assignment2] = pair.split(",");
    const [start1, end1] = assignment1.split("-").map((n) => Number(n));
    const [start2, end2] = assignment2.split("-").map((n) => Number(n));

    if (
      (start1 <= start2 && end1 >= end2) ||
      (start2 <= start1 && end2 >= end1)
    ) {
      count++;
    }
  });

  return count;
};
console.log(findFullOverlaps());
