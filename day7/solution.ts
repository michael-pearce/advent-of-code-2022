let start = performance.now();

import { readFileSync } from "fs";
let commands = readFileSync("day7/input.txt", "utf-8").split("\r\n");

interface IObject {
  name: string;
  type: string;
  depth: number;
  parent: IObject;
  contents: Array<IObject>;
  size: number;
}

let root: IObject = {
  name: "root",
  type: "folder",
  depth: 0,
  parent: {} as IObject,
  contents: [],
  size: 0,
};
let currDepth: number = 1;
let currDir = {} as IObject;
let currName: string;
let bigDirs: string[] = [];
let sumBigDirs = 0;
let deleteDirs: string[] = [];
let sizeDeleteDir: number = Infinity;

function propagateSize(size: number, obj: IObject) {
  if (Object.keys(obj.parent).length != 0) {
    obj.parent.size += size;
    propagateSize(size, obj.parent);
  }
}

function getBigDirs(limit: number, obj: IObject) {
  obj.contents.forEach((el) => {
    if (el.size <= limit && el.type == "folder") {
      bigDirs.push(el.name);
      sumBigDirs += el.size;
    }
    getBigDirs(limit, el);
  });
}

function findDelDir(minDeleteSize: number, obj: IObject) {
  obj.contents.forEach((el) => {
    if (el.size >= minDeleteSize && el.type == "folder") {
      deleteDirs.push(el.name);
      if (el.size < sizeDeleteDir) {
        sizeDeleteDir = el.size;
      }
    }
    findDelDir(minDeleteSize, el);
  });
}

commands.forEach((el) => {
  let parsed = el.split(" ");
  if (parsed[0] == "$") {
    if (parsed[1] == "cd") {
      if (parsed[2] == "/") {
        currDir = root;
      } else if (parsed[2] == "..") {
        currDepth--;
        currDir = currDir.parent;
      } else {
        currDepth++;
        currName = parsed[2];
        if (!currDir.contents.map((el) => el.name).includes(currName)) {
          currDir.contents.push({
            name: currName,
            type: "folder",
            depth: currDepth,
            parent: currDir,
            contents: [],
            size: 0,
          });
          currDir = currDir.contents.at(-1)!;
        } else {
          currDir = currDir.contents.find((el) => el.name == currName)!;
        }
      }
    }
  } else {
    if (parsed[0] == "dir") {
      currDir.contents.push({
        name: parsed[1],
        type: "folder",
        depth: currDepth,
        parent: currDir,
        contents: [],
        size: 0,
      });
    } else {
      currDir.contents.push({
        name: parsed[1],
        type: "file",
        depth: currDepth,
        parent: currDir,
        contents: [],
        size: parseInt(parsed[0]),
      });
      propagateSize(parseInt(parsed[0]), currDir.contents.at(-1)!);
    }
  }
});

getBigDirs(100_000, root);
findDelDir(root.size - 40_000_000, root);

let end = performance.now();
console.log(`Completed in ${((end - start) / 1000).toFixed(3)} seconds to run`);
