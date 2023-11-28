class monkey {
  constructor(
    public id: number,
    public items: bigint[],
    public divisor: bigint,
    public operation: string,
    public thrownToTrue: number,
    public thrownToFalse: number,
    public currItem: bigint = items[0],
    public numItems: number = items.length,
    public itemsInspected: number = 0
  ) {}

  public testAndThrow(monkeys: monkey[]): void {
    this.currItem =
      eval(this.operation) % (7n * 3n * 2n * 11n * 17n * 5n * 13n * 19n);
    let thrownMonkey;
    if (this.currItem % this.divisor == 0n) {
      thrownMonkey = monkeys.find((el) => el.id == this.thrownToTrue)!;
    } else {
      thrownMonkey = monkeys.find((el) => el.id == this.thrownToFalse)!;
    }
    thrownMonkey.items.push(this.currItem);
    this.items.shift();
    this.currItem = this.items[0];
    this.itemsInspected++;
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

let start = performance.now();
import { readFileSync } from "fs";

let monkeys: monkey[] = [];
let numRounds: number = 10_000; 

readFileSync("day11/input.txt", "utf-8")
  .split("\r\n\r\n")
  .forEach((obj) => {
    let lines = obj.split("\r\n");
    let id = parseInt(lines[0].split(" ")[1][0]);
    let items = lines[1]
      .split(":")[1]
      .split(",")
      .map((el) => BigInt(el.trim()));
    let divisor = BigInt(lines[3].split(":")[1].split(" ")[3]);
    let operation = lines[2]
      .split(":")[1]
      .split("=")[1]
      .trim()
      .replace(/old/g, "this.currItem")
      .replace(/\d+/, (num) => num + "n");
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
    }
  });
  if (i % 100 == 0) {
    console.log(`${i} rounds done`);
  }
}

let monkeyBusiness = monkeys
  .sort((a, b) => a.itemsInspected - b.itemsInspected)
  .slice(-2)
  .reduce((prod, val) => prod * val.itemsInspected, 1);

let end = performance.now();

console.log(monkeyBusiness);
monkeys.forEach((currMonkey) => console.log(currMonkey.toString()));
console.log(`Completed in ${((end - start) / 1000).toFixed(3)} seconds`);
