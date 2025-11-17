import { accessSync, constants, existsSync } from "node:fs";
import { join } from "node:path";
import { PATHS } from "../main";

export const getExecutableDirectories = (fileName: string): string => {
  for (const directory of PATHS) {
    const fullPath = join(directory, fileName);
    if (isExecutable(fullPath)) return fullPath;
  }
  return "";
};

const isExecutable = (path: string) => {
  try {
    if (!exist(path)) return false;
    accessSync(path, constants.R_OK);
  } catch (err) {
    return false;
  }
};

const exist = (path: string): boolean => {
  return existsSync(path);
};
