let start = performance.now();

import { createReadStream } from "fs";
let stackLen: number = 14;

let buffer = createReadStream("day6/input.txt", {
  encoding: "utf-8",
  // start: 0,
  // end: 12,
  highWaterMark: stackLen,
});
let stack: string[] = [];
let chunkIdx: number = 0;
let numChars: number;

buffer.on("data", function (chunk: string) {
  if (chunkIdx == 0) {
    stack = [...chunk];

  } else {

    for (let i = 0; i < chunk.length; i++) {

      if ([...new Set(stack)].length < stackLen) {
        stack.push(chunk.charAt(i));
        stack.shift();
      } else {
        numChars = chunkIdx * stackLen + i;
        buffer.destroy();
        let end = performance.now()
        console.log(`${chunkIdx}: ${numChars}: ${stack.toString()}`);
        console.log(`Completed in ${((end - start)/1000).toFixed(3)} seconds to run`)
        break;
      }
      // console.log(`${chunkIdx}: ${stack.toString()}`);
    }
  }
  chunkIdx++;
});
