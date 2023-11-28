import { readFileSync } from "fs";
import * as lo from "lodash";

interface ISensor {
  coords: number[];
  beaconCoords: number[];
  manR: number; // radius calculated with manhattan distance
}

function manhattanD(a: number[], b: number[]) {
  return Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1]);
}

let sensors: ISensor[] = [];
let beacons: number[][] = [];
let regex = /\d+/g;

readFileSync("day15/input.txt", "utf-8")
  .split("\r\n")
  .forEach((ln) => {
    let halves = ln
      .split(":")
      .map((half) => [...half.matchAll(regex)].map((el) => Number(el)));
    sensors.push({
      coords: halves[0],
      beaconCoords: halves[1],
      manR: manhattanD(halves[0], halves[1]),
    });
    if (!beacons.some((b) => lo.isEqual(b, halves[1]))) {
      beacons.push(halves[1]);
    }
  });

let rowMin = Math.min(...sensors.map((s) => s.coords[0] - s.manR));
let rowMax = Math.max(...sensors.map((s) => s.coords[0] + s.manR));
let xVals = lo.range(rowMin, rowMax + 1, 1);
let invalids = new Set();
let yCoord = 2000000;

sensors.forEach((s) => {
  xVals.forEach((x, i) => {
    if (
      manhattanD(s.coords, [x, yCoord]) <= s.manR &&
      !beacons.some((b) => b[0] == x && b[1] == yCoord)
    ) {
      invalids.add(x);
    }
  });
});

console.log(invalids.size);
