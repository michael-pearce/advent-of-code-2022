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

function outsideSensor(p: number[], s: number[], manD: number) {
  let xMin = s[0] - manD
  let xMax = s[0] + manD
  let yMin = s[1] - manD
  let yMax = s[1] + manD
  return p[0] < xMin || p[0] > xMax || p[1] < yMin || p[1] > yMax
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
let yCoord = 10;

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

let grid: number[][] = []
let [xGrid, yGrid] = [lo.range(0,20,1), lo.range(0,20,1)]

for (let i = 0; i < xGrid.length; i++) {
  for (let j = 0; j < yGrid.length; j++) {
    grid.push([i,j])
  }
}



for (let i = 0; i < sensors.length; i++) {
  console.log(`sensor ${i}`)

  console.log(outsideSensor([14,11], sensors[i].coords, sensors[i].manR))

  // for (let j = 0; j < grid.length; j++){
  //   if (withinSensor(grid[j], sensors[i].coords, sensors[i].manR)){
  //     console.log("in a sensor")
  //     grid.splice(j,1)
  //     j--
  //   }
  //   else{
  //     console.log("not in a sensor")
  //   }
  // }
  
}

console.log(grid.length)

// function manhattanRadius(a: number[], manD: number) {
//   let radius: number[][] = [];
//   for (let i = 0; i < manD + 1; i++) {
//     radius.push([a[0] + i, a[1] + (manD - i)]);
//     radius.push([a[0] + i, a[1] - (manD - i)]);
//     radius.push([a[0] - i, a[1] + (manD - i)]);
//     radius.push([a[0] - i, a[1] - (manD - i)]);
//     // radius.push([a[0]])
//   }
//   radius.splice(2,2)
//   radius.splice(-3,2)

//   return radius
// }
