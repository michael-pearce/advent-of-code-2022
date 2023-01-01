let start = performance.now();

interface ILayer {
  name: string;
  depth: number;
  contents: Array<IContents>;
  size: number;
}

interface IContents {
  name: string;
  depth: number;
  type: string;
  size: number;
}

import { readFileSync } from "fs";
let commands = readFileSync("day7/input.txt", "utf-8").split("\r\n");

// let layers: Array<ILayer> = [{ depth: 1, contents: [] }];
// let depths = [1];

let folders: Array<ILayer> = [];
let currDepth: number = 1;
let currDir = {} as ILayer;
let currName: string;
let prevName: string;
let addingContents: boolean = false;

function resolveSizes(folderList:Array<ILayer>, folder:ILayer){
  folder.contents.forEach(obj => {
    if (obj && obj.type == "file"){
      folder.size += obj.size
    }
  })
}

// function recordCommand(command: string) {
//   return command != "$";
// }

// assume you'd never need to cd in and out of a dir more than once to record all it's files

commands.forEach((el, index) => {
  let parsed = el.split(" ");

  if (parsed[0] == "$") {
    if (parsed[1] == "cd") {
      if (parsed[2] == "/") {
        currDepth = 1;
        currName = "root";
      } else if (parsed[2] == "..") {
        currDepth--;
        currName = prevName.valueOf();
      } else {
        currDepth++;
        prevName = currName.valueOf();
        currName = parsed[2];
      }
      if(addingContents){
        folders.push(currDir)
        addingContents = false;
      }
      if (folders.map((folder) => folder.name).includes(currName)) {
        currDir = folders.find((folder) => folder.name == currName)!;
      } else {
        currDir = { name: currName, depth: currDepth, contents: [], size:0 };
      }

    }
    // if (!depths.includes(currDepth)) {
    //   depths.push(currDepth);
    //   layers.push({ depth: currDepth, contents: [] });
    // }
    console.log(`line ${index}: command`);
  } else {
    if (parsed[0] == "dir") {
      currDir.contents.push({
        type: "folder",
        name: parsed[1],
        depth: currDepth,
        size: 0,
      });
    } else {
      currDir.contents.push({
        type: "file",
        name: parsed[1],
        depth: currDepth,
        size: parseInt(parsed[0]),
      });
      // currDir.size! += parseInt(parsed[0])
    }
    addingContents = true;
    console.log(`line ${index}, file: ${parsed[1]} at depth: ${currDepth}`);
  }
});
folders.push(currDir)

let end = performance.now();
console.log(`Completed in ${((end - start) / 1000).toFixed(3)} seconds to run`);
console.log("done");

// if (parsed[0] == "$") {
//   if (parsed[1] == "cd") {
//     if (parsed[2] == "/") {
//       currDepth = 1;
//     } else if (parsed[2] == "..") {
//       currDepth--;
//     } else {
//       currDepth++;
//     }
//   }
//   if (!depths.includes(currDepth)) {
//     depths.push(currDepth);
//     layers.push({ depth: currDepth, contents: [] });
//   }
//   console.log(`line ${index}: command`);
// } else {
//   if (parsed[0] == "dir") {
//     layers
//       .find((el) => el.depth == currDepth)
//       ?.contents.push({
//         type: "folder",
//         name: parsed[1],
//         depth: currDepth,
//         size: 0,
//       });
//   } else {
//     layers
//       .find((el) => el.depth == currDepth)
//       ?.contents.push({
//         type: "file",
//         name: parsed[1],
//         depth: currDepth,
//         size: parseInt(parsed[0]),
//       });
//   }
//   console.log(`line ${index}, file: ${parsed[1]} at depth: ${currDepth}`);
// }
