import { readFileSync } from "fs";

let sections = readFileSync("day4/input.txt", "utf-8").split("\r\n");
let regex = /\d+-\d+/g;

function expandRange(range: string) {
  let start = parseInt(range.split("-")[0]);
  let end = parseInt(range.split("-")[1]);
  let len = end - start + 1;
  return Array(len)
    .fill(1)
    .map((_, i) => i + start)
    .join(" ");
}

let containedPairs = sections
  .map((section) => {
    let matches = section.match(regex);
    if (matches) {
      matches.forEach((match) => {
        section = section.replace(match, expandRange(match));
      });
    }
    let halves = section.split(",");
    let firstHalf = halves[0].split(" ");
    let secondHalf = halves[1].split(" ");
    let result = 0;
    if (
      // use "every" to solve part 1, "some" to solve part 2
      firstHalf.every((el) => secondHalf.includes(el)) ||
      secondHalf.every((el) => firstHalf.includes(el)) 
    ) {
      result = 1;
    }
    return result;
  })
  .reduce((sum, val) => sum + val, 0);

console.log(containedPairs);
