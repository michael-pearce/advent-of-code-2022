let start = performance.now();

import { readFileSync } from "fs";

let buffer = readFileSync("day6/input.txt", "utf-8");
let stack: string[] = [];
let numChars: number = 0;
let stackLen: number = 14; // use 4 for star 1, 14 for star 2

for (let i = 0; i < buffer.length; i++) {
  if(i == 0){
    stack = [...buffer.slice(0,stackLen)]
  }
  else{
    if ([...new Set(stack.slice(-1 * stackLen))].length < stackLen) {
      stack.push(buffer[i]);
      stack.shift();
    } else {
      numChars = i;
      break;
    }
  }
}
let end = performance.now()
console.log(`${numChars}: ${stack.toString()}`);
console.log(`Completed in ${((end - start)/1000).toFixed(3)} seconds to run`)

console.log("done")

