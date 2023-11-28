import { readFileSync } from "fs";

let packets = readFileSync("day13/input.txt", "utf-8")
  .split("\r\n\r\n")
  .map((pair) => pair.split("\r\n").map((packet) => JSON.parse(packet)));

function compare(l: any[], r: any[]): number {
  for (let i = 0; i < l.length; i++) {
    let left = l[i];
    let right = r[i];

    if (right == undefined) {
      return -1;
    }

    if (Number.isInteger(left) && Number.isInteger(right)) {
      if (left > right) {
        return -1;
      } else if (left < right) {
        return 1;
      }
    } else if (Array.isArray(left) && Number.isInteger(right)) {
      right = [right];
    } else if (Number.isInteger(left) && Array.isArray(right)) {
      left = [left];
    }

    if (Array.isArray(left) && Array.isArray(right)) {
      if (compare(left, right) == -1 || compare(left, right) == 1)
        return compare(left, right);
    }
  }

  if (l.length < r.length) {
    return 1;
  }

  return 0;
}

let results = packets.map((packet, idx) => {
  if (compare(packet[0], packet[1]) == 1) {
    return idx + 1;
  } else {
    return 0;
  }
});
let count = results.reduce((sum, val) => sum + val, 0);
console.log(count);

let allPackets = [[[2]], [[6]]];
packets.forEach((both) => {
  allPackets = allPackets.concat([both[0], both[1]]);
});

let newPackets = allPackets.sort((a, b) => compare(b, a));

let div1 =
  newPackets.findIndex((el) => {
    try {
      return el[0][0] == 2;
    } catch (error) {
      return false;
    }
  }) + 1;

let div2 =
  newPackets.findIndex((el) => {
    try {
      return el[0][0] == 6;
    } catch (error) {
      return false;
    }
  }) + 1;

console.log(div1 * div2);
