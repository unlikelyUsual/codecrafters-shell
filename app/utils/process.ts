import { exec, execFile, spawn } from "node:child_process";
import { promisify } from "node:util";

const execPromise = promisify(exec);
const execFilePromise = promisify(execFile);

export function runWithSpawn(command: string, args: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args);

    let stdout = "";
    let stderr = "";

    // Collect stdout data
    child.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    // Collect stderr data
    child.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    // Handle process completion
    child.on("close", (code) => {
      if (code === 0) {
        resolve(stdout.trim());
      } else {
        reject(new Error(`Command failed with code ${code}: ${stderr}`));
      }
    });

    // Handle errors
    child.on("error", (error) => {
      reject(error);
    });
  });
}
