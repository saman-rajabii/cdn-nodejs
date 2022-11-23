import fs from "fs";
import path from "path";
import { NextFunction, Request, Response } from "express";

import config from "../../config";
import { HTTP_CODE, MESSAGES, MIME_TYPES } from "../../constants/enums";
import { FileService } from "../services";

const upload = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { minify } = req.query;
    const { "file-name": fileName } = req.headers;

    if (!fileName) {
      res.status(HTTP_CODE.BAD_REQUEST).send({
        success: false,
        data: MESSAGES.FILE_NAME_IS_REQUIRED,
      });
    }

    const dirPath = path.join(config.savePath, req.user.username);

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }

    const mimeType = req.headers["content-type"];

    if (!mimeType) {
      res.status(HTTP_CODE.BAD_REQUEST).send({
        success: false,
        data: MESSAGES.FILE_IS_REQUIRED,
      });
    } else if (mimeType == MIME_TYPES.CSS || mimeType == MIME_TYPES.JS) {
      const result = await FileService.upload(
        req,
        path.join(dirPath, String(fileName)),
        req.headers["content-type"],
        Boolean(minify)
      );

      res.status(HTTP_CODE.OK).send({
        success: true,
        data: result,
      });
    } else
      res.status(HTTP_CODE.BAD_REQUEST).send({
        success: false,
        data: MESSAGES.FILE_TYPE_MUST_BE_JS_OR_CSS,
      });
  } catch (error) {
    switch (error.message) {
      case MESSAGES.FILE_EXTENSION_IS_NOT_MATCH_WITH_UPLOADED_CONTENT_TYPE:
        res.status(HTTP_CODE.BAD_REQUEST).send({
          success: false,
          data: MESSAGES.FILE_EXTENSION_IS_NOT_MATCH_WITH_UPLOADED_CONTENT_TYPE,
        });
        break;
      default:
        next(error);
    }
  }
};

const getFiles = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { page, pageSize } = req.query;

    const [count, files] = await FileService.getFiles(
      req.user.id,
      Number(page) || null,
      Number(pageSize) || null
    );

    res.status(HTTP_CODE.OK).send({
      success: true,
      count,
      data: files,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  upload,
  getFiles,
};
