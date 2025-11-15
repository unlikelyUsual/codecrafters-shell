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

    const trimmedAnswer = answer.trim();

    if (
      trimmedAnswer.toLowerCase() === "exit" ||
      trimmedAnswer.toLowerCase() === "quit"
    ) {
      console.log("Goodbye!");
      rl.close();
      process.exit(0);
    }

    if (!trimmedAnswer) {
      continue;
    }

    const [command, ...params] = trimmedAnswer.split(/\s+/g);

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

// Start the loop
mainLoop().catch((error) => {
  console.error("Fatal error:", error);
  rl.close();
  process.exit(1);
});

// Handle Ctrl+C gracefully
process.on("SIGINT", () => {
  console.log("\nGoodbye!");
  rl.close();
  process.exit(0);
});

// Handle termination signals
process.on("SIGTERM", () => {
  console.log("\nTerminating...");
  rl.close();
  process.exit(0);
});

// Note: SIGKILL cannot be caught or handled
// Cleanup on process exit
process.on("exit", (code) => {
  rl.close();
});
