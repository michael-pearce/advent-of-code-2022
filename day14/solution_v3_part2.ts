import { readFileSync } from "fs";
import * as lo from "lodash";

let regex = /\d+,\d+/g;
let [xMax, yMax] = [-Infinity, -Infinity];

let rocks = readFileSync("day14/input.txt", "utf-8")
  .split("\r\n")
  .map((rock) =>
    rock.match(regex)?.map((el) => {
      let coord = el.split(",");
      let intCoord = [Number(coord[0]), Number(coord[1])];
      intCoord[0] > xMax ? (xMax = intCoord[0]) : null;
      intCoord[1] > yMax ? (yMax = intCoord[1]) : null;
      return intCoord;
    })
  );

let grid: string[][] = [...Array(yMax + 1 + 2)].map( // add 2 for floor
  () => Array(xMax + 1).fill(".")
);

grid[0][500] = "+"; // create nozzle entry point
grid.at(-1)?.forEach((_, i) => (grid.at(-1)![i] = "#"));
rocks.forEach((rock) => {
  if (rock) {
    for (let i = 0; i < rock.length - 1; i++) {
      let [xDiff, yDiff] = [
        rock[i + 1][0] - rock[i][0],
        rock[i + 1][1] - rock[i][1],
      ];

      if (xDiff != 0) {
        let step = 1;
        xDiff < 0 ? (step = -1) : null;
        let newX = lo.range(rock[i][0], rock[i + 1][0] + step, step);
        newX.forEach((point) => (grid[rock[i][1]][point] = "#"));
      }

      if (yDiff != 0) {
        let step = 1;
        yDiff < 0 ? (step = -1) : null;
        let newY = lo.range(rock[i][1], rock[i + 1][1] + step, step);
        newY.forEach((point) => (grid[point][rock[i][0]] = "#"));
      }
    }
  }
});

let [overflowing, atRest, validMove] = [false, false, false];
let [diagL, diagR, down] = [
  [1, -1],
  [1, 1],
  [1, 0],
];
let currPos = [0, 500];
let numGrains = 0;
let jammed = false;

while (!jammed) {
  atRest = false;
  currPos = [0, 500]; // starting point for sand in [y,x] syntax
  while (!atRest) {
    for (const move of [down, diagL, diagR]) {
      [currPos, validMove, overflowing] = checkMove(currPos, move, grid);
      if (validMove) break;
    }
    if (validMove) continue;
    else {
      grid[currPos[0]][currPos[1]] = "o";
      numGrains += 1;
      atRest = true;
      if (currPos[0] == 0 && currPos[1] == 500) {
        jammed = true;
      }
    }
  }
}
console.log(numGrains);

function checkMove(
  currPos: number[],
  move: number[],
  grid: string[][]
): [number[], boolean, boolean] {
  let newPos = lo.zip(currPos, move).map(([c, m]) => c! + m!);
  if (newPos[1] > grid[0].length - 1) {
    grid.forEach((row) => {
      row.push(".");
    });
    grid.at(-1)![newPos[1]] = "#"; // extend the floor
  }
  let gridVal = grid[newPos[0]][newPos[1]];
  if (gridVal == ".") {
    return [newPos, true, false]; // currPos, validMove, overFlowing
  } else {
    return [currPos, false, false];
  }
}
