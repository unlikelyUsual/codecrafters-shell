import COMMANDS from "./Commands";
import { getExecutableDirectories } from "./utils/files";
import { runWithSpawn } from "./utils/process";

const handleEcho = (...params: string[]): string => {
  return params.join(" ");
};

const handleType = (...params: string[]): string => {
  const command = params[0];
  if (command in commandMap) return `${params[0]} is a shell builtin`;
  else {
    const path = getExecutableDirectories(command);
    return path ? `${command} is ${path}` : `${command}: not found`;
  }
};

const handleExit = (...params: string[]): string => {
  return "";
};

const handlePwd = (): string => {
  return process.cwd();
};

const commandMap: Record<COMMANDS, Function> = {
  [COMMANDS.ECHO]: handleEcho,
  [COMMANDS.TYPE]: handleType,
  [COMMANDS.EXIT]: handleExit,
  [COMMANDS.PWD]: handlePwd,
};

const commandHandler = async (
  command: string,
  params: string[]
): Promise<string> => {
  const commandKey = command as COMMANDS;
  if (commandKey in commandMap) {
    return commandMap[commandKey](...params);
  } else {
    const path = getExecutableDirectories(commandKey);
    if (path) {
      try {
        return await runWithSpawn(commandKey, params);
      } catch (error) {
        console.error("Error:", error);
        return `Error in running with spawn`;
      }
    } else {
      return `${command}: command not found`;
    }
  }
};

export default commandHandler;
