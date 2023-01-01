import { readFileSync } from "fs";

let operations = readFileSync("day10/input.txt", "utf-8")
  .split("\r\n")
  .map((el) => {
    return [el.split(" ")[0], parseInt(el.split(" ")[1])];
  });

let x = 1;
let cycleCount = 0;
let signalStrength = 0;
let sprite: number[] = [0, 1, 2];
let checkPoints: number[] = [20, 60, 100, 140, 180, 220];
let newLines: number[] = [40, 80, 120, 160, 200, 240];

function printPixel(cycle: number) {
  if (sprite.includes(cycle % 40)) {
    process.stdout.write("#");
  } else {
    process.stdout.write(".");
  }
}

operations.forEach((op) => {
  if (checkPoints.some((el) => el - 2 <= cycleCount)) {
    signalStrength += checkPoints[0] * x;
    checkPoints.shift();
  }

  if (op[0] == "addx") {
    for (let i = 0; i < 2; i++) {
      printPixel(cycleCount);
      cycleCount++;
      if (newLines.includes(cycleCount)) {
        process.stdout.write("\n");
      }
    }
    x += op[1] as number;
    sprite = [x - 1, x, x + 1];
  } else {
    printPixel(cycleCount);
    cycleCount++;
    if (newLines.includes(cycleCount)) {
      process.stdout.write("\n");
    }
  }
});

process.stdout.write("done\n");
