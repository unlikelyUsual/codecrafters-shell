import { accessSync, constants, existsSync } from "node:fs";
import { join } from "node:path";
import { PATHS } from "../main";

const getExecutableDirectories = (fileName: string) => {
  for (const directory of PATHS) {
    const fullPath = join(directory, fileName);
  }
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
