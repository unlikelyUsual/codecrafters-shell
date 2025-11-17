import COMMANDS from "./Commands";
import { getExecutableDirectories } from "./utils/files";

const handleEcho = (...params: string[]): string => {
  return params.join(" ");
};

const handleType = (...params: string[]): string => {
  const command = params[0];
  if (command in commandMap) return `${params[0]} is a shell builtin`;
  else if (getExecutableDirectories(command))
    return `${command} is ${getExecutableDirectories(command)}`;
  else return `${command}: not found`;
};

const handleExit = (...params: string[]): string => {
  return "";
};
const commandMap: Record<COMMANDS, Function> = {
  [COMMANDS.ECHO]: handleEcho,
  [COMMANDS.TYPE]: handleType,
  [COMMANDS.EXIT]: handleExit,
};

const commandHandler = (command: string, params: string[]): string => {
  const commandKey = command as COMMANDS;
  if (commandKey in commandMap) {
    return commandMap[commandKey](...params);
  } else {
    return `${command}: command not found`;
  }
};

export default commandHandler;
