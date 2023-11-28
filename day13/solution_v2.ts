import { readFileSync } from "fs";

let packets = readFileSync("day13/input.txt", "utf-8")
  .split("\r\n\r\n")
  .map((pair) => pair.split("\r\n").map((packet) => JSON.parse(packet)));

function compare(l: any, r: any): number | void {
  if (l.length > r.length) {
    return -1;
  }

  for (let i = 0; i < l.length; i++) {
    let left = l[i];
    let right = r[i];

    if (Number.isInteger(left) && Number.isInteger(right)) {
      if (left < right) {
        return 1;
      } else if (left > right) {
        return -1;
      } else if (Array.isArray(left) && Number.isInteger(right)) {
        right = [right];
      } else if (Number.isInteger(left) && Array.isArray(right)) {
        left = [left];
      }

      if (Array.isArray(left) && Array.isArray(right)) {
        if (Math.abs(compare(left, right)!) == 1) {
          return compare(left, right);
        }
      }
    }
  }

  if (l.length < r.length) {
    return 1;
  }
}

let results = packets.map((packet, idx) => {
  if (compare(packet[0], packet[1]) == 1) {
    return idx + 1;
  } else {
    return 0;
  }
});

// let results = packets.map((packet, idx) => {
//   if (comparePackets(packet[0], packet[1], [true, true], idx)) {
//     return idx + 1;
//   } else {
//     return 0;
//   }
// });
// // .reduce((sum, val) => sum + val, 0);

console.log("hi");
