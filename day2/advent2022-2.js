const fs = require("fs");
const input = fs.readFileSync("input2.txt", "utf8").split("\n");

const PT_ROCK = 1;
const PT_PAPER = 2;
const PT_SCISSOR = 3;
const WIN = 6;
const DRAW = 3;
const LOSE = 0;

const getPoints = (scores) => {
  let totalScore = 0;
  input.forEach((row) => (totalScore += scores[`${row[0]}${row[2]}`]));
  return totalScore;
};

/*=============================================
=                  Part 1                     =
=============================================*/

const scores1 = {
  AX: PT_ROCK + DRAW, // Io:sasso (X), lui:sasso (A) -> pareggio
  BX: PT_ROCK + LOSE, // Io:sasso (X), lui:carta (B) -> perdo
  CX: PT_ROCK + WIN, // Io:sasso (X), lui:forbice (C) -> vinco
  AY: PT_PAPER + WIN, // Io:carta (Y), lui:sasso (A) -> vinco
  BY: PT_PAPER + DRAW, // Io:carta (Y), lui:carta (B) -> pareggio
  CY: PT_PAPER + LOSE, // Io:carta (Y), lui:forbice (C) -> perdo
  AZ: PT_SCISSOR + LOSE, // Io:forbice (Z), lui:sasso (A) -> perdo
  BZ: PT_SCISSOR + WIN, // Io:forbice (Z), lui:carta (B) -> vinco
  CZ: PT_SCISSOR + DRAW, // Io:forbice (Z), lui:forbice (C) -> pareggio
};
console.log(getPoints(scores1));

/*=============================================
=                  Part 2                     =
=============================================*/

const scores2 = {
  AX: LOSE + PT_SCISSOR, // lui:sasso (A) | io:perdo (X) -> forbice
  BX: LOSE + PT_ROCK, // lui:carta (B) | io:perdo (X) -> sasso
  CX: LOSE + PT_PAPER, // lui:forbice (C) | io:perdo (X) -> carta
  AY: DRAW + PT_ROCK, // lui:sasso (A) | io:pareggio (Y) -> sasso
  BY: DRAW + PT_PAPER, // lui:carta (B) | io:pareggio (Y) -> carta
  CY: DRAW + PT_SCISSOR, // lui:forbice (C) | io:pareggio (Y) -> forbice
  AZ: WIN + PT_PAPER, // lui:sasso (A) | io:vinco (Z) -> carta
  BZ: WIN + PT_SCISSOR, // lui:carta (B) | io:vinco (Z) -> forbice
  CZ: WIN + PT_ROCK, // lui:forbice (C) | io:vinco (Z) -> sasso
};
console.log(getPoints(scores2));
