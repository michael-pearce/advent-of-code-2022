import { readFileSync } from "fs";

let operations = readFileSync("day10/input.txt", "utf-8")
  .split("\r\n")
  .map((el) => {
    return [el.split(" ")[0], parseInt(el.split(" ")[1])];
  });

function addX(startCycle: number, endCycle: number, num: number) {}

async function listenForValue(num: number) {
  const promise = new Promise<void>((resolve) => {
    if (num == 4) {
      console.log("resolved");
      resolve();
    }
  });
}

async function generateListenForValue(num: number, endNum: number) {
  const promise = new Promise<void>((resolve) => {
    if (num == endNum) {
      console.log("resolved");
      resolve();
    }
  });
}

// for (let i = 0; i < 10; i++) {
//   setTimeout(() => console.log(`${i} completed`), 1000);

//   listenForValue(i);
// }

function myLoop(i: number) {
  setTimeout(function () {
    /// creates this looping function that calls itself

    console.log(`cycle ${i} start`);
    //   listenForValue(i)
    generateListenForValue(i, i + 5);
    console.log(`cycle ${i} end`);

    // decrement i and calls myLoop again if i > 0
    if (--i) {
      myLoop(i);
    }
  }, 1000);
}

// myLoop(10);

// operations.forEach((op, cycle) => {
//   console.log(`${cycle}: start`);
//   if(op[0] == "addx"){
//     generateListenForValue(cycle, op[1] as number)
//   }

//   console.log(`${cycle}: end`);
// });


// for (let i = 0; i < operations.length; i++) {
//     console.log(`${i}: start`);
//   if(operations[i][0] == "addx"){
//     generateListenForValue(i, operations[i][1] as number)
//   }

//   console.log(`${i}: end`);

    
// }

// let cycle = 0



// async function listenTo() {
//     await cycle == 4
//     console.log("this equals 4")
//     // const promise = new Promise<void>((resolve) => {
//     //     await cycle == 0;
//     // });
//   }
// listenTo()




// let trigger = false;

// const promise = new Promise<void>((resolve, reject) => {

//     console.log(trigger)
//     if(trigger){
//         console.log(`${cycle} resolved`)
//         resolve();
//     }
// })


// for (let i = 0; i < 100; i++) {
//     cycle++;
//     if(i == 6){
//         trigger = true
//     }
//     console.log(`${cycle}: end`);
// }




// console.log("done")
