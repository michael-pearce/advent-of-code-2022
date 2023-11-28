import { readFileSync } from "fs";

let allGames = readFileSync("day2/input.txt", "utf-8")
  .split("\r\n")
  .map((game) => game.replace(" ", ""));

// Star 1
let choiceScore = { X: 1, Y: 2, Z: 3 };
let matchScore = {
  AX: 3, AY: 6, AZ: 0,
  BX: 0, BY: 3, BZ: 6,
  CX: 6, CY: 0, CZ: 3,
};

let myChoiceScore = allGames
  .map((game) => choiceScore[game[1] as keyof typeof choiceScore])
  .reduce((sum, val) => sum + val, 0);
let myGameScore = allGames
  .map((game) => matchScore[game as keyof typeof matchScore])
  .reduce((sum, val) => sum + val, 0);

let totalScore = myChoiceScore + myGameScore;

// Star 2
let choiceScore2 = {
    AX: 3, AY: 1, AZ: 2,
    BX: 1, BY: 2, BZ: 3,
    CX: 2, CY: 3, CZ: 1,
}
let matchScore2 = { X: 0, Y: 3, Z: 6}

let myChoiceScore2 = allGames
  .map((game) => choiceScore2[game as keyof typeof choiceScore2])
  .reduce((sum, val) => sum + val, 0);
let myGameScore2 = allGames
  .map((game) => matchScore2[game[1] as keyof typeof matchScore2])
  .reduce((sum, val) => sum + val, 0);

let totalScore2 = myChoiceScore2 + myGameScore2;

console.log(totalScore, totalScore2)
