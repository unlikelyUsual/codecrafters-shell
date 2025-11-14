import { stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline/promises";
import commandHandler from "./handler";

const rl = readline.createInterface({
  input,
  output,
});

const answer = await rl.question("$ ");

const [command, ...params] = answer.split(/\s/g);

// console.log(`Command by user : ${command} and parameters : `, params);

const returnStr = commandHandler(command, params);

rl.write(returnStr);

rl.close();
