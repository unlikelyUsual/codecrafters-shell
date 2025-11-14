import type COMMANDS from "./Commands";

const commandMap: Record<COMMANDS, Function> = {};

const commandHandler = (command: string, ...params: unknown[]): string => {
  if (command in commandMap) {
    return "";
  } else {
    return `${command}: command not found\n`;
  }
};

export default commandHandler;
