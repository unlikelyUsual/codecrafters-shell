import { existsSync } from "node:fs";
import { join } from "node:path";
import { PATHS } from "../main";

export const getExecutableDirectories = (fileName: string): string => {
  for (const directory of PATHS) {
    const fullPath = join(directory, fileName);
    if (existsSync(fullPath)) return fullPath;
  }
  return "";
};
