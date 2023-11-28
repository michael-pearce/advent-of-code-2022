import { readFileSync } from "fs";

let allElves = readFileSync("day1/input.txt", "utf-8").split("\r\n\r\n");
let allElvesCal = allElves.map((elf) =>
  elf.split("\r\n").reduce((sum, val) => sum + parseInt(val), 0)
);

let topElf = Math.max(...allElvesCal);
let topThreeElves = allElvesCal
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((sum, val) => sum + val, 0);

console.log(topElf, topThreeElves);
