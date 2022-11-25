import fs from "fs";
import path from "path";

export default {
  setFileNameVersion(filePath: string): [string, string] {
    if (fs.existsSync(filePath)) {
      const filePathWithoutExt = path.join(
        path.dirname(filePath),
        path.basename(filePath, path.extname(filePath))
      );

      let newPath = filePath;
      let prevFilePath;
      let counter = 0;

      do {
        counter++;
        prevFilePath = newPath;
        newPath = `${filePathWithoutExt}_${counter}${path.extname(filePath)}`;
      } while (fs.existsSync(newPath));

      return [newPath, prevFilePath];
    }
    return [filePath, null];
  },

  formatMemoryUsage(memory: number) {
    return Math.round((memory / 1024 / 1024) * 100) / 100; // calculated in MB
  },
};
