import fs from "fs";
import path from "path";
import cssMinifier from "clean-css";
import jsMinifier from "uglify-js";
import { MIME_TYPES } from "../../constants/enums";
import { file as fileUtils } from "../../utils";
import mongoose from "mongoose";

process.on("message", (msg: any) => {
  minify(msg.uploadedPath, msg.type, msg.logId);
});

function minify(
  uploadedPath: string,
  type: string,
  logId: mongoose.Types.ObjectId
): any {
  const startTime = new Date().getTime();
  switch (type) {
    case MIME_TYPES.CSS: {
      new cssMinifier().minify(fs.readFileSync(uploadedPath), (err, output) => {
        if (err) {
          throw err;
        }
        console.log(output);
        fs.writeFileSync(uploadedPath, output.styles);
      });
      break;
    }
    case MIME_TYPES.JS: {
      const minifiedContent = jsMinifier.minify(
        fs.readFileSync(uploadedPath, "utf8")
      );
      console.log(`${path.basename(uploadedPath, path.extname(uploadedPath))}`);

      fs.writeFileSync(uploadedPath, minifiedContent.code);
      break;
    }
    default:
      break;
  }
  const measureExecutionTime = new Date().getTime() - startTime;
  const { heapUsed } = process.memoryUsage();

  process.send({
    minifyDuration: measureExecutionTime,
    memoryConsumption: fileUtils.formatMemoryUsage(heapUsed),
    logId,
  });
}
