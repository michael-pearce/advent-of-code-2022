import { readFileSync } from "fs";

let ruckSacks = readFileSync("day3/input.txt", "utf-8").split("\r\n");

function isLowerCase(str: string) {
  return str == str.toLowerCase();
}

// Star 1
let sumPriorities = ruckSacks
  .map((str) => {
    const letterMap = new Map<string, number>();
    let duplicate;
    [...str].forEach((char, i) => {
      let half = str.length / 2;
      if (!letterMap.has(char)) {
        letterMap.set(char, Math.floor(i / half));
      } else if (letterMap.get(char)! < Math.floor(i / half)) {
        duplicate = isLowerCase(char)
          ? char.charCodeAt(0) - 96
          : char.charCodeAt(0) - 38;
        return;
      }
    });
    return duplicate;
  })
  .reduce((sum, val) => sum + val!, 0);

// Star 2
let groupPriorities = 0;
for (let i = 0; i < ruckSacks.length; i += 3) {
  const letterMap = new Map<string, number[]>();
  let badge = 0;
  for (let j = 0; j < 3; j++) {
    [...new Set(ruckSacks[i + j])].forEach((char) => {
      if (!letterMap.has(char)) {
        letterMap.set(char, [j + 1]);
      } else if (letterMap.get(char)?.at(-1) != j + 1) {
        letterMap.get(char)?.push(j + 1)!;
        if (letterMap.get(char)!.length == 3) {
          badge = isLowerCase(char)
            ? char.charCodeAt(0) - 96
            : char.charCodeAt(0) - 38;
        }
      }
    });
  }
  groupPriorities += badge
}

console.log(sumPriorities, groupPriorities)
