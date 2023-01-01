import { readFileSync } from "fs";

interface INode {
  coords: number[];
  height: number;
  distToGoal: number;
}
let startCoords: number[] = [];
let startCoordList: number[][] = [];
let endCoords: number[] = [];
let grid: number[][] = readFileSync("day12/input.txt", "utf-8")
  .split("\r\n")
  .map((line, row) =>
    line.split("").map((char, col) => {
      if (char == "S") {
        startCoords = [row, col];
        startCoordList.push([row, col]);
        return "a".charCodeAt(0) - 96;
      } else if (char == "E") {
        endCoords = [row, col];
        return "z".charCodeAt(0) - 96;
      } else {
        if (char == "a") {
          startCoordList.push([row, col]);
        }
        return char.charCodeAt(0) - 96;
      }
    })
  );
let distance = Infinity;
const dirs = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];

for (const startOption of startCoordList) {
  const start: INode = {
    coords: startOption,
    height: grid[startOption[0]][startOption[1]],
    distToGoal: 0,
  };
  const visited: INode[] = []; 
  const queue: INode[] = [start]; 

  while (queue.length > 0) {
    const currNode = queue.shift();
    if (currNode) {
      //  ensure currNode is defined
      if (
        visited.some((el) => {
          return (
            el.coords[0] == currNode.coords[0] &&
            el.coords[1] == currNode.coords[1]
          );
        })
      ) {
        continue; // ensure that we do not revisit nodes
      }
      visited.push(currNode);
      if (
        currNode.coords[0] == endCoords[0] &&
        currNode.coords[1] == endCoords[1]
      ) {
        if (currNode.distToGoal < distance) {
          distance = currNode.distToGoal;
        }
        break;
      }
      for (const dir of dirs) {
        let nX = currNode.coords[0] + dir[0];
        let nY = currNode.coords[1] + dir[1];
        if (
          nX >= 0 &&
          nX < grid.length &&
          nY >= 0 &&
          nY < grid[0].length &&
          grid[nX][nY] - currNode.height <= 1
        ) {
          const nNode: INode = {
            coords: [nX, nY],
            height: grid[nX][nY],
            distToGoal: currNode.distToGoal + 1,
          };
          queue.push(nNode);
        }
      }
    }
  }
}

console.log(distance);


// helpful if visualizing the grid
function displayGrid(grid: number[][]) {
      let output = "";
      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
          const element = grid[i][j];
          if (element == 0) {
            output += "SS ";
          } else if (element < 10) {
            output += "0" + element + " ";
          } else if (element == 27) {
            output += "EE ";
          } else {
            output += element + " ";
          }
        }
        if (i != grid.length - 1) output += "\n";
      }
      console.log(output);
    }
