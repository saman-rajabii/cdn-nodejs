import { Request } from "express";
import fs from "fs";
import path from "path";
import cssMinifier from "clean-css";
import jsMinifier from "uglify-js";
import config from "../../config";
import { FILE_EXTENSIONS, MESSAGES, MIME_TYPES } from "../../constants/enums";
import { file as fileUtils } from "../../../utils";
import childProcess from "child_process";
import { File, IFile } from "../../models";
import mongoose from "mongoose";

const minification = childProcess.fork(
  "dist/src/api/services/minify.service.js"
);

minification.on("message", async (msg: any) => {
  const { logId, minifyDuration, memoryConsumption } = msg;
  await File.updateOne(
    { id: logId, deletedAt: { $exists: false } },
    { minifyDuration, memoryConsumption }
  );
});

function ceckTypeMatching(type: string, extension: string): boolean {
  switch (type) {
    case MIME_TYPES.CSS:
      return extension == FILE_EXTENSIONS.CSS;
    case MIME_TYPES.JS:
      return extension == FILE_EXTENSIONS.JS;
    default:
      return false;
  }
}

async function uploadProcess(req: Request, filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(filePath);

    stream.on("open", () => {
      req.pipe(stream);
    });

    stream.on("close", async () => {
      resolve(filePath);
    });

    stream.on("error", (err) => {
      console.error(err);
      reject(err);
    });
  });
}
export default {
  async upload(
    req: Request,
    filePath: string,
    type: string,
    minify: boolean
  ): Promise<any> {
    if (!ceckTypeMatching(type, path.extname(filePath))) {
      throw new Error(
        MESSAGES.FILE_EXTENSION_IS_NOT_MATCH_WITH_UPLOADED_CONTENT_TYPE
      );
    }

    await File.updateOne(
      { name: path.basename(filePath), type, deletedAt: { $exists: false } },
      { deletedAt: new Date() }
    );
    const uploadedPath = await uploadProcess(req, filePath);

    const fileLog = await File.create({
      userId: req.user.id,
      type,
      size: Number(req.headers["content-length"]),
      name: path.basename(uploadedPath),
    });
    if (minify) {
      minification.send({
        uploadedPath,
        type,
        logId: fileLog._id,
      });
    }
  },

  async getFiles(
    userId: mongoose.Types.ObjectId,
    page?: number,
    pageSize?: number
  ): Promise<[number, Partial<IFile>[]]> {
    let result: [number, Partial<IFile>[]];

    page = page || 1;
    pageSize = pageSize || config.pageSize;

    result = await Promise.all([
      File.countDocuments({ userId, deletedAt: { $exists: false } }),
      File.find({ userId, deletedAt: { $exists: false } })
        .sort({ createdAt: -1 })
        .skip(pageSize * (page - 1))
        .limit(pageSize)
        .lean(),
    ]);

    return result;
  },
};
