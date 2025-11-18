import { accessSync, constants } from "node:fs";
import { join } from "node:path";
import { PATHS } from "../main";

export const getExecutableDirectories = (fileName: string): string => {
  for (const directory of PATHS) {
    const fullPath = join(directory, fileName);
    try {
      accessSync(fullPath, constants.X_OK);
      return fullPath;
    } catch (error) {
      continue;
    }
  }
  return "";
};
