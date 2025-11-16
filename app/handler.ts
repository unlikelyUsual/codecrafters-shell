import COMMANDS from "./Commands";

const handleEcho = (...params: string[]): string => {
  return params.join(" ");
};

const handleType = (...params: string[]): string => {
  return `${params[0]} is a shell builtin`;
};

const commandMap: Record<COMMANDS, Function> = {
  [COMMANDS.ECHO]: handleEcho,
  [COMMANDS.TYPE]: handleType,
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
