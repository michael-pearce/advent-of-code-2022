import { readFileSync } from "fs";

let moves = readFileSync("day9/input.txt", "utf-8")
  .split("\r\n")
  .map((el) => {
    return [el.split(" ")[0], parseInt(el.split(" ")[1])];
  });

let moveSet: Record<string, number[]> = {
  //basic moves
  R: [0, 1],
  L: [0, -1],
  U: [-1, 0],
  D: [1, 0],
  // diagonal moves
  RU: [-1, 1],
  RD: [1, 1],
  LU: [-1, -1],
  LD: [1, -1],
};
let numKnots = 10;
let knotPos = Array.from({ length: numKnots }).map(() => [0, 0]);
let tailCells: number[][] = [knotPos.at(-1)!];

function euclidDist(pos1: number[], pos2: number[]) {
  return ((pos2[0] - pos1[0]) ** 2 + (pos2[1] - pos1[1]) ** 2) ** (1 / 2);
}

function getBestMove(pos1: number[], pos2: number[]) {
  let minDist = ["", Infinity];
  for (const move in moveSet) {
    let testPos = [...pos1];
    testPos = testPos.map((el, index) => el + moveSet[move][index]);
    let dist = euclidDist(testPos, pos2);
    if (dist < minDist[1]) {
      minDist[0] = move;
      minDist[1] = dist;
    }
  }
  return minDist;
}

function getUnique(array: number[][]) {
  let unique: number[][] = [];
  for (const val of array) {
    if (!unique.some((el) => el[0] == val[0] && el[1] == val[1])) {
      unique.push(val);
    }
  }
  return unique;
}

moves.forEach((el) => {
  let typeMove = el[0];
  let numMoves = el[1];

  for (let i = 0; i < numMoves; i++) {
    knotPos[0] = knotPos[0].map((el, index) => el + moveSet[typeMove][index]);
    for (let j = 1; j < knotPos.length; j++) {
      let dist = euclidDist(knotPos[j], knotPos[j - 1]);
      if (dist >= 2) {
        let bestMove = getBestMove(knotPos[j], knotPos[j - 1]);
        knotPos[j] = knotPos[j].map(
          (el, index) => el + moveSet[bestMove[0]][index]
        );
      }
    }
    tailCells.push(knotPos.at(-1)!);
  }
});

tailCells = getUnique(tailCells);
console.log("done");
