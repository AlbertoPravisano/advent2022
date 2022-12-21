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

/*****************************************************************************
--- Day 2: Rock Paper Scissors ---
The Elves begin to set up camp on the beach. To decide whose tent gets to be closest to the snack storage, 
a giant Rock Paper Scissors tournament is already in progress.

Rock Paper Scissors is a game between two players. Each game contains many rounds; in each round, 
the players each simultaneously choose one of Rock, Paper, or Scissors using a hand shape. 
Then, a winner for that round is selected: Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock. 
If both players choose the same shape, the round instead ends in a draw.

Appreciative of your help yesterday, one Elf gives you an encrypted strategy guide 
(your puzzle input) that they say will be sure to help you win. "The first column is what your opponent 
is going to play: A for Rock, B for Paper, and C for Scissors. The second column--" Suddenly, the Elf 
is called away to help with someone's tent.

The second column, you reason, must be what you should play in response: X for Rock, Y for Paper, and Z for Scissors. 
Winning every time would be suspicious, so the responses must have been carefully chosen.

The winner of the whole tournament is the player with the highest score. Your total score is the sum of your scores 
for each round. The score for a single round is the score for the shape you selected (1 for Rock, 2 for Paper, 
and 3 for Scissors) plus the score for the outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won).

Since you can't be sure if the Elf is trying to help you or trick you, you should calculate the score you would get 
if you were to follow the strategy guide.

For example, suppose you were given the following strategy guide:

A Y
B X
C Z
This strategy guide predicts and recommends the following:

In the first round, your opponent will choose Rock (A), and you should choose Paper (Y). This ends in a win for you with a score of 8 (2 because you chose Paper + 6 because you won).
In the second round, your opponent will choose Paper (B), and you should choose Rock (X). This ends in a loss for you with a score of 1 (1 + 0).
The third round is a draw with both players choosing Scissors, giving you a score of 3 + 3 = 6.
In this example, if you were to follow the strategy guide, you would get a total score of 15 (8 + 1 + 6).

What would your total score be if everything goes exactly according to your strategy guide?

--- Part Two ---
The Elf finishes helping with the tent and sneaks back over to you. "Anyway, the second column says how the round needs to end: X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win. Good luck!"

The total score is still calculated in the same way, but now you need to figure out what shape to choose so the round ends as indicated. The example above now goes like this:

In the first round, your opponent will choose Rock (A), and you need the round to end in a draw (Y), so you also choose Rock. This gives you a score of 1 + 3 = 4.
In the second round, your opponent will choose Paper (B), and you choose Rock so you lose (X) with a score of 1 + 0 = 1.
In the third round, you will defeat your opponent's Scissors with Rock for a score of 1 + 6 = 7.
Now that you're correctly decrypting the ultra top secret strategy guide, you would get a total score of 12.

Following the Elf's instructions for the second column, what would your total score be if everything goes exactly according to your strategy guide?
*****************************************************************************/
