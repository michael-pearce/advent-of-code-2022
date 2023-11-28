class monkey {
  constructor(
    public id: number,
    public items: number[],
    public divisor: number,
    public operation: string,
    public thrownToTrue: number,
    public thrownToFalse: number,
    public currItem: number = items[0],
    public numItems: number = items.length,
    public itemsInspected: number = 0
  ) {}

  public testAndThrow(monkeys: monkey[]): void {
    this.currItem = this.executeOperation();
    let thrownMonkey;
    if (this.currItem % this.divisor == 0) {
      thrownMonkey = monkeys.find((el) => el.id == this.thrownToTrue)!;
    } else {
      thrownMonkey = monkeys.find((el) => el.id == this.thrownToFalse)!;
    }
    thrownMonkey.items.push(this.currItem);
    this.items.shift();
    this.currItem = this.items[0];
    this.itemsInspected++;
  }

  public executeOperation(): number {
    // return Math.floor(eval(this.operation) / 3);
    return Math.floor(eval(this.operation) / 3);
  }

  public updateNumItems() {
    this.numItems = this.items.length;
    this.currItem = this.items[0];
  }

  public toString(): string {
    return `Monkey ${this.id} : ${this.items.join(", ")} {${
      this.itemsInspected
    }}`;
  }
}

import { readFileSync } from "fs";

let monkeys: monkey[] = [];
let numRounds: number = 20; // old is 20

readFileSync("day11/input.txt", "utf-8")
  .split("\r\n\r\n")
  .forEach((obj) => {
    let lines = obj.split("\r\n");
    let id = parseInt(lines[0].split(" ")[1][0]);
    let items = lines[1]
      .split(":")[1]
      .split(",")
      .map((el) => parseInt(el.trim()));
    let divisor = parseInt(lines[3].split(":")[1].split(" ")[3]);
    let operation = lines[2]
      .split(":")[1]
      .split("=")[1]
      .trim()
      .replace(/old/g, "this.currItem");
    let thrownToTrue = parseInt(lines[4].split(":")[1].split(" ")[4]);
    let thrownToFalse = parseInt(lines[5].split(":")[1].split(" ")[4]);
    monkeys.push(
      new monkey(id, items, divisor, operation, thrownToTrue, thrownToFalse)
    );
  });

for (let i = 0; i < numRounds; i++) {
  monkeys.forEach((currMonkey) => {
    currMonkey.updateNumItems();
    for (let j = 0; j < currMonkey.numItems; j++) {
      currMonkey.testAndThrow(monkeys);
      // console.log(currMonkey.items.length)
    }
  });
  // monkeys.forEach((currMonkey) => console.log(currMonkey.toString()));
}

let monkeyBusiness = monkeys
  .sort((a, b) => a.itemsInspected - b.itemsInspected)
  .slice(-2)
  .reduce((prod, val) => prod * val.itemsInspected, 1);

console.log(monkeyBusiness);
