import type COMMANDS from "./Commands";

const commandMap: Record<COMMANDS, Function> = {};

const commandHandler = (command: string): string => {
  if (command in commandMap) {
    return "";
  } else {
    return `${command}: command not found`;
  }
};

export default commandHandler;
