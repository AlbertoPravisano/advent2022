const fs = require("fs");
const input = fs.readFileSync("input1.txt", "utf8").split("\n");

const END_INVENTARY = "";

/*=============================================
=                   Part 1                    =
=============================================*/

const getTotalCaloriesElfs = () => {
  let maxCalories = 0;
  let currentTotal = 0;

  input.forEach((row) => {
    if (row === END_INVENTARY) {
      if (currentTotal > maxCalories) {
        maxCalories = currentTotal;
      }
      currentTotal = 0;
    } else {
      currentTotal += Number(row);
    }
  });
  return maxCalories;
};
console.log(getTotalCaloriesElfs());

/*=============================================
=               Part 2 (TODO)                 =
=============================================*/

const getMaxCaloriesThreElfs = () => {
  let topThreeElves = [0, 0, 0];
  let currentElfCalories = 0;

  input.forEach((row) => {
    if (row === END_INVENTARY) {
      const indexTopThreeElf = topThreeElves.findIndex(
        (topThreeElfCalories) => currentElfCalories > topThreeElfCalories
      );
      if (indexTopThreeElf >= 0) {
        topThreeElves[indexTopThreeElf] = currentElfCalories;
      }
      currentElfCalories = 0;
    } else {
      currentElfCalories += Number(row);
    }
  });

  return topThreeElves.reduce((acc, currentValue) => acc + currentValue, 0);
};
console.log(getMaxCaloriesThreElfs());
