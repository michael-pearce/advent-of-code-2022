// this got quite complicated because I was trying to visualize all of the changes in the grid as it went, instead of just solving the problem
// think more, code less

import { readFileSync } from "fs";

let moves = readFileSync("day9/input.txt", "utf-8")
  .split("\r\n")
  .map((el) => {
    return [el.split(" ")[0], parseInt(el.split(" ")[1])];
  });

const grid: string[][] = [
  [".", ".", "."],
  [".", ".", "."],
  ["H", ".", "."],
];

let [l, w] = [grid.length, grid[0].length];

let start = [l - 1, 0]; //bottom left
let posH = [...start];
let posT = [...start]
let oldH: number[];
let oldT: number[];
let tailGap = 0;
let rowGap = 0;
let colGap = 0;


function displayGrid(grid: string[][]) {
  let output = "";
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const element = grid[i][j];
      output += element + " ";
    }
    if (i != grid.length - 1) output += "\n";
  }
  console.log(output);
}

function updateGrid(oldH: number[], nextH: number[], oldT:number[], nextT:number[], grid: string[][]) {
  grid[oldH[0]][oldH[1]] = "."; // change to x maybe in future
  grid[oldT[0]][oldT[1]] = ".";

  // element needs to move outside the grid to the right
  if (nextH[1] >= grid[0].length) {
    let hDiff = nextH[1] - grid[0].length + 1;
    for (let i = 0; i < hDiff; i++) {
      for (let j = 0; j < grid.length; j++) {
        grid[j].push(".");
      }
    }
  }

  // element needs to move outside the grid to the LEFT: UPDATE!!!!
  // if (nextH[0] < 0) {
  //   let vDiff = Math.abs(nextH[0]);
  //   nextH[0] = 0;
  //   for (let i = 0; i < vDiff; i++) {
  //     grid.unshift(Array.from(Array(grid[0].length), () => "."));
  //   }
  // }

  // element needs to move outside the grid to the top
  if (nextH[0] < 0) {
    let vDiff = Math.abs(nextH[0]);
    nextH[0] = 0;
    for (let i = 0; i < vDiff; i++) {
      grid.unshift(Array.from(Array(grid[0].length), () => "."));
    }
  }

  // element needs to move outside the grid to the bottom
  if (nextH[0] >= grid.length) {
    let vDiff = nextH[0] - grid.length + 1;
    for (let i = 0; i < vDiff; i++) {
      grid.push(Array.from(Array(grid[0].length), () => "."));
    }
  }

  grid[nextH[0]][nextH[1]] = "H";
  if(nextT[0] < 0){
    nextT[0] = 0
  }
  grid[nextT[0]][nextT[1]] = "T";
  // displayGrid(grid)
  // console.log("\n")
}

function moveHead(move: [string, number], grid: string[][]) {
  switch (move[0]) {
    case "R": //move right [y, x + R]
      for (let i = 0; i < move[1]; i++) {
        [oldH, oldT] = [[...posH],[...posT]]
        posH[1]++;
        tailGap = Math.abs(posH[0] - posT[0]) + Math.abs(posH[1] - posT[1])
        if(tailGap >= 2){
          let rowGap = posH[0] - posT[0];
          let colGap = posH[1] - posT[1];
          // console.log(rowGap,colGap)
          posT[1]++;
        }

        updateGrid(oldH, posH, oldT, posT, grid);
        displayGrid(grid);
        console.log(posT.join(":") + "\n");
      }
      break;

    case "L": // move left [y, x - L]
      for (let i = 0; i < move[1]; i++) {
        [oldH, oldT] = [[...posH],[...posT]]
        posH[1]--;
        tailGap = Math.abs(posH[0] - posT[0]) + Math.abs(posH[1] - posT[1])
        if(tailGap > 2){
          console.log("diagonal move")

          let rowGap = posH[0] - posT[0];
          let colGap = posH[1] - posT[1];

          if(rowGap != 0 && colGap != 0 ){
            if(rowGap < 0){
              posT[0]--;
            }
            else{
              posT[0]++
            }
            if(colGap < 0){
              posT[1]--;
            }
            else{
              posT[1]++
            }
          }
        }
        else if(tailGap > 1){
          posT[1]--;
        }
        updateGrid(oldH, posH, oldT, posT, grid);
        displayGrid(grid);
        console.log(posT.join(":") + "\n");
      }
      break;

    case "U": // move up [y - U, x]
      for (let i = 0; i < move[1]; i++) {
        [oldH, oldT] = [[...posH],[...posT]]
        posH[0]--;
        tailGap = Math.abs(posH[0] - posT[0]) + Math.abs(posH[1] - posT[1])
        if(tailGap > 2){
          console.log("diagonal move")

          let rowGap = posH[0] - posT[0];
          let colGap = posH[1] - posT[1];

          if(rowGap != 0 && colGap != 0 ){
            if(rowGap < 0){
              posT[0]--;
            }
            else{
              posT[0]++
            }
            if(colGap < 0){
              posT[1]--;
            }
            else{
              posT[1]++
            }
          }
        }
        else if(tailGap > 1){
          posT[0]--;
        }
        updateGrid(oldH, posH, oldT, posT, grid);
        displayGrid(grid);
        console.log(posT.join(":") + "\n");
      }
      break;

    case "D": // move down [y + D, x]
      for (let i = 0; i < move[1]; i++) {
        [oldH, oldT] = [[...posH],[...posT]]
        posH[0]++;
        tailGap = Math.abs(posH[0] - posT[0]) + Math.abs(posH[1] - posT[1])
        if(tailGap >= 2){
          posT[0]++;
        }
        updateGrid(oldH, posH, oldT, posT, grid);
        displayGrid(grid);
        console.log(posT.join(":") + "\n");
      }
      break;
  }
}

// function moveTail(dir:string){
//   // two if statements
//   switch (dir) {
//     case "R": //move right [y, x + R]

//       break;

//     case "L": // move left [y, x - L]


//     case "U": // move up [y - U, x]

//       break;

//     case "D": // move down [y + D, x]

//       break;

// }

moves.forEach((el, index) => {
  if (index == 0) {
    displayGrid(grid);
    console.log(posT.join(":") + "\n");
  }
  moveHead(el as [string, number], grid);
  // console.log(tailGap)
});

displayGrid(grid);
console.log(posT.join(":") + "\n");
console.log("done");
