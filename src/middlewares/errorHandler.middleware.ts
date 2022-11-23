import { ValidationError } from "express-validation";
import { NextFunction, Request, Response } from "express";
import config from "../config";
import { HTTP_CODE, MESSAGES, LOG_LABELS } from "../constants/enums";
import { logger } from "../../utils";

export default function (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response {
  if (error instanceof ValidationError) {
    return res.status(HTTP_CODE.BAD_REQUEST).send({
      success: false,
      message: error.message,
      details: error.details,
    });
  }

  if (config.developerMode) {
    return res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({
      message: error.message,
      details: error.stack,
    });
  }

  logger.error(LOG_LABELS.UNHANDLED_ERROR, "Error in errorHandler", error);

  return res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({
    message: MESSAGES.UNKNOWN_INTERNAL_ERROR,
  });
}
