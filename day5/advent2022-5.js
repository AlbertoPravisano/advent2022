const fs = require("fs");
const input = fs.readFileSync("input5.txt", "utf8").split("\n");

/*=============================================
=                  Part 1 TODO                =
=============================================*/

const findTopCrates = () => {
  const stacks = input.slice(0, 9);
  const moves = input.slice(10);

  for (const move of moves) {
    const parts = move.split(" ");
    const numCrates = Number(parts[1]);
    const fromStack = Number(parts[3]);
    const toStack = Number(parts[5]);

    console.log(stacks, numCrates, fromStack, toStack);
  }

  return "";
};

console.log(findTopCrates());
