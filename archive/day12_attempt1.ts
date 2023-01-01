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

function breadthFirst(root: Node, target: number) {

  while (queue2.length > 0) {
    const current = queue2.shift();

    if (current && !visited2.some((prior) => prior.equals(current))) {
      if (current.height == target) {
        return current;
      } else {
        visited2.push(current);
      }
      current.children
        .filter((child) => !visited2.some((prior) => prior.equals(child)))
        .forEach((child) => queue2.push(child));
    }
  }

  return null;

};

let x = breadthFirst(root, 27)

let fungrid:number[][] = new Array(5).fill(new Array(8))

for (const cell of visited2) {
  fungrid[cell.pos[0]][cell.pos[1]] = 1
  
}

displayGrid(fungrid)




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

// class Node {
//   // The value of the node
//   value: any;
//   // The children of the node
//   children: Node[];

//   constructor(value: any, children: Node[]) {
//     this.value = value;
//     this.children = children;
//   }
// }

// function breadthFirstSearch(root: Node, value: any): Node | null {
//   // Create a queue to store the nodes that are visited
//   const queue = [root];

//   // Keep track of the nodes that have been visited
//   const visited = new Set();

//   // While there are still nodes in the queue
//   while (queue.length > 0) {
//     // Take the first node from the queue
//     const current = queue.shift();

//     // If the value is found, return the node
//     if (current.value === value) {
//       return current;
//     }

//     // Add the current node to the visited set
//     visited.add(current);

//     // Add the children of the current node to the queue
//     current.children.forEach((child) => {
//       if (!visited.has(child)) {

// function breadthFirstSearch(root: TreeNode, value: any) {
//   // create a queue to store nodes
//   const queue = [root];

//   // iterate through queue until empty
//   while (queue.length > 0) {
//     // get the first node in the queue
//     const node = queue.shift();

//     // check if the node's value matches the search value
//     if (node.value === value) {
//       // return the node if found
//       return node;
//     }

//     // add the left and right children to the queue
//     if (node.left) {
//       queue.push(node.left);
//     }
//     if (node.right) {
//       queue.push(node.right);
//     }
//   }

//   // return null if the value is not found
//   return null;
// }
