import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import config from "../config";
import { HTTP_CODE, MESSAGES, LOG_LABELS } from "../constants/enums";

export default function (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(HTTP_CODE.UNAUTHORIZED).send({
        message: MESSAGES.TOKEN_IS_REQUIRED,
      });
    }

    const tokenParts = authorization.split(" ");

    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(HTTP_CODE.UNAUTHORIZED).send({
        message: MESSAGES.TOKEN_IS_INVALID,
      });
    }

    const tokenPayload: any = jwt.verify(tokenParts[1], config.signature);

    req.user = {
      id: tokenPayload._id,
      username: tokenPayload.username,
    };

    next();
  } catch (error) {
    next(error);
  }
}
