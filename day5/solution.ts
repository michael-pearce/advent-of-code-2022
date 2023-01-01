import { readFileSync } from "fs";

let initialState = [
  ["J", "H", "G", "M", "Z", "N", "T", "F"],
  ["V", "W", "J"],
  ["G", "V", "L", "J", "B", "T", "H"],
  ["B", "P", "J", "N", "C", "D", "V", "L"],
  ["F", "W", "S", "M", "P", "R", "G"],
  ["G", "H", "C", "F", "B", "N", "V", "M"],
  ["D", "H", "G", "M", "R"],
  ["H", "N", "M", "V", "Z", "D"],
  ["G", "N", "F", "H"],
];

function moveStack(
  numCrates: number,
  origin: number,
  destination: number,
  craneType: string
) {
  origin--;
  destination--;
  if (craneType == "CrateMover 9000") {
    for (let i = 0; i < numCrates; i++) {
      let box = currState[origin].pop();
      if (box) {
        currState[destination].push(box);
      }
    }
  } else if (craneType == "CrateMover 9001") {
    let box = currState[origin].splice(-numCrates, numCrates)
    currState[destination].push(...box)
  }
}

let currState = [...initialState];
let instructions = readFileSync("day5/input.txt", "utf-8")
  .split("\r\n")
  .slice(10);
let regex = /\d+/g;

instructions.forEach((line, i) => {
  let nums = line.match(regex)?.map((num) => parseInt(num));
  if (nums) {
    moveStack(nums[0], nums[1], nums[2], "CrateMover 9001"); //change crane type for diff stars
  }
});

currState.forEach((stack) => console.log(stack.at(-1)));


