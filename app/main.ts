import { stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline/promises";
import commandHandler from "./handler";

const rl = readline.createInterface({
  input,
  output,
});

const answer = await rl.question("$ ");

console.log(`Command by user : `, answer);

rl.write(commandHandler(answer));

rl.close();
