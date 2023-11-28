import { readFileSync } from "fs";
let rows = readFileSync("day8/input.txt", "utf-8").split("\r\n");
const grid: number[][] = [];

function treesToEdge(pos: number[], height: number, grid: number[][]) {
  let startRow = pos[0];
  let startCol = pos[1];
  let [left, right, top, bottom] = [[], [], [], []] as number[][];

  // Go to the left
  for (let col = 0; col < startCol; col++) {
    left.push(grid[startRow][col]);
  }
  // Go to the right
  for (let col = startCol + 1; col < grid[0].length; col++) {
    right.push(grid[startRow][col]);
  }
  // Go to the top
  for (let row = 0; row < startRow; row++) {
    top.push(grid[row][startCol]);
  }
  // Go to the bottom
  for (let row = startRow + 1; row < grid.length; row++) {
    bottom.push(grid[row][startCol]);
  }

  return [left, right, top, bottom];
}

function scenicScore(treesToEdge: number[][], height: number) {
  let scores = [0, 0, 0, 0];

  for (let i = 0; i < treesToEdge.length; i++) {
    // reverse directions in for loop depending on order the trees are stored
    if (i <= 1) {
      for (let j = treesToEdge[i].length - 1; j >= 0; j--) {
        scores[i]++;
        if (treesToEdge[i][j] >= height) {
          break;
        }
      }
    } else {
      for (let j = 0; j < treesToEdge[i].length; j++) {
        scores[i]++;
        if (treesToEdge[i][j] >= height) {
          break;
        }
      }
    }
  }
  return scores.reduce((product, val) => product * val, 1);
}

rows.forEach((row) => grid.push(row.split("").map((el) => parseInt(el))));
let [l, w] = [grid.length, grid[0].length];
let outerVisible = 2 * (l + w) - 4;
let visible = 0;
let highestScore = 0;

// loop through inner grid
for (let i = 1; i < l - 1; i++) {
  for (let j = 1; j < w - 1; j++) {
    let height = grid[i][j];
    let [left, right, top, bottom] = treesToEdge([i, j], height, grid);
    if (
      left.every((el) => el < height) ||
      right.every((el) => el < height) ||
      top.every((el) => el < height) ||
      bottom.every((el) => el < height)
    ) {
      visible++;
    }
    let score = scenicScore([left, top, right, bottom], height);
    if (score > highestScore) {
      highestScore = score;
    }
  }
}
visible += outerVisible;
console.log(visible, highestScore);

// helpful if wanting to view the data structure
function displayGrid(grid: number[][]) {
  let output = "";
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const element = grid[i][j];
      output += element + " ";
    }
    output += "\n";
  }
  console.log(output);
}
