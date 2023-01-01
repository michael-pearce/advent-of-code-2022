import { readFileSync } from "fs";

let grid: number[][] = readFileSync("day12/input.txt", "utf-8")
  .split("\r\n")
  .map((line) =>
    line.split("").map((char) => {
      if (char.charCodeAt(0) == 83) {
        //S
        return 0;
      } else if (char.charCodeAt(0) == 69) {
        //E
        return 27;
      } else {
        return char.charCodeAt(0) - 96;
      }
    })
  );

displayGrid(grid);

class Node {
  constructor(
    public height: number,
    public pos: number[],
    public children: Node[] = []
  ) {}

  public toString() {
    return `Cell [${this.pos[0]}, ${this.pos[1]}] : ${this.height}`;
  }

  public equals(other: Node) {
    return (
      this.height === other.height &&
      this.pos[0] === other.pos[0] &&
      this.pos[1] === other.pos[1]
    );
  }
}

// how to populate the root variable with the contents of the grid
const root = new Node(grid[0][0], [0, 0]);
const queue = [root];
const visited: Node[] = [];

while (queue.length > 0) {
  const cNode = queue.shift();
  if (cNode && !visited.some((prior) => prior.equals(cNode))) {
    visited.push(cNode);
    let valN = [
      [cNode.pos[0] - 1, cNode.pos[1]],
      [cNode.pos[0] + 1, cNode.pos[1]],
      [cNode.pos[0], cNode.pos[1] - 1],
      [cNode.pos[0], cNode.pos[1] + 1],
    ].filter(
      (el) =>
        el[0] >= 0 &&
        el[0] < grid.length &&
        el[1] >= 0 &&
        el[1] < grid[0].length &&
        !visited.some((prior) =>
          prior.equals(new Node(grid[el[0]][el[1]], [el[0], el[1]]))
        )
    );
    for (const N of valN) {
      const child = new Node(grid[N[0]][N[1]], [N[0], N[1]]);
      cNode.children.push(child);
      queue.push(child);
    }
  }
}

const queue2 = [root];
const visited2: Node[] = [];

while (queue2.length > 0) {
  const current = queue2.shift();

  if (current) {
    if (current.height == 27) {
      break;
    }
    current.children
      .filter((child) => !visited2.some((prior) => prior.equals(child)))
      .forEach((child) => queue2.push(child));
  }
}

console.log("done");

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
