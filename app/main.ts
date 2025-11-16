import { stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline/promises";
import commandHandler from "./handler";

const rl = readline.createInterface({
  input,
  output,
});

const mainLoop = async () => {
  while (true) {
    const answer = await rl.question("$ ");

    const trimmedAnswer = answer.trim().toLocaleLowerCase();

    if (!trimmedAnswer) {
      continue;
    }

    const [command, ...params] = trimmedAnswer.split(/\s+/g);

    if (command === "exit" || command === "quit") {
      rl.close();
      process.exit(0);
    }

    try {
      const returnStr: string = commandHandler(command, params);

      if (returnStr) {
        console.log(returnStr);
      }
    } catch (error) {
      console.error(
        "Error executing command:",
        error instanceof Error ? error.message : error
      );
    }
  }
};

mainLoop().catch((error) => {
  console.error("Fatal error:", error);
  rl.close();
  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("\nGoodbye!");
  rl.close();
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("\nTerminating...");
  rl.close();
  process.exit(0);
});

process.on("exit", (code) => {
  rl.close();
});
