const fs = require("fs");
const input = fs.readFileSync("input3.txt", "utf8").split("\n");

const isLowerCaseLetter = (letter) => letter.toLowerCase() === letter;

const getPriorityChar = (letter) => {
  if (isLowerCaseLetter(letter)) {
    // [a,..z] = [1,..26]
    return letter.charCodeAt(0) - 96;
  } else {
    // [A,..Z] = [27,..52]
    return letter.charCodeAt(0) - 64 + 26;
  }
};

/*=============================================
=                  Part 1                     =
=============================================*/

/** @param {string} rucksack */
const getCompartments = (rucksack) => {
  const middle = Math.floor(rucksack.length / 2);
  const c1 = rucksack.substring(0, middle).split("");
  const c2 = rucksack.substring(middle).split("");
  return { c1, c2 };
};

const findPriorityRucksack = (rucksack) => {
  const { c1, c2 } = getCompartments(rucksack);
  let priority = 0;
  c1.find((letter1) => {
    if (c2.findIndex((letter2) => letter1 === letter2) >= 0) {
      priority = getPriorityChar(letter1);
      return true;
    }
  });
  return priority;
};

const getPriority = () => {
  let priority = 0;
  input.forEach((rucksack) => (priority += findPriorityRucksack(rucksack)));
  return priority;
};

console.log(getPriority());

/*=============================================
=               Part 2 (TODO)                 =
=============================================*/

/** @returns {string[][]} */
const splitIntoTriplets = (input) => {
  let indexGroup = 0;
  let groups = [[]];

  input.forEach((row, index) => {
    if (index % 3) {
      groups[indexGroup].push(row);
    } else {
      indexGroup++;
      groups.push([]);
      groups[indexGroup].push(row);
    }
  });
  return groups.filter((group) => group.length > 0);
};

/** @param {string[]} rucksacks TODO: doesn't work? */
const findCommonChar = (rucksacks) => {
  // Create a map to store the count of each item type
  const itemCount = new Map();
  let badgeItem = "";

  for (const rucksack of rucksacks) {
    for (const character of rucksack) {
      if (!itemCount.has(character)) {
        itemCount.set(character, 0);
      }
      itemCount.set(character, itemCount.get(character) + 1);
    }
  }

  for (const [item, count] of itemCount.entries()) {
    if (count === rucksacks.length) {
      badgeItem = item;
      break;
    }
  }
  return badgeItem;
};

const getPriorityTriplets = () => {
  let priority = 0;
  splitIntoTriplets(input).forEach((triplet) => {
    const commonChar = findCommonChar(triplet);
    priority += getPriorityChar(commonChar);
  });
  return priority;
};
console.log(getPriorityTriplets());
