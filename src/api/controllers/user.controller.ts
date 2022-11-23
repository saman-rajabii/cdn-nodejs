import bcrypt from "bcrypt";
import { HTTP_CODE, MESSAGES } from "../../constants/enums";
import { NextFunction, Request, Response } from "express";
import { UserService } from "../services";

const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body;
    const { accessToken, refreshToken } = await UserService.signin({
      username,
      password,
    });

    res.status(HTTP_CODE.OK).send({
      success: true,
      data: { accessToken, refreshToken },
    });
  } catch (error) {
    switch (error.message) {
      case MESSAGES.USER_NOT_FOUND:
        res.status(HTTP_CODE.NOT_FOUND).send({
          success: false,
          data: MESSAGES.USER_NOT_FOUND,
        });
        break;
      case MESSAGES.PASSWORD_IS_WRONG:
        res.status(HTTP_CODE.BAD_REQUEST).send({
          success: false,
          data: MESSAGES.PASSWORD_IS_WRONG,
        });
        break;
      default:
        next(error);
    }
  }
};

const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body;

    const newUser = await UserService.createUser({
      username,
      password,
    });

    res.status(HTTP_CODE.OK).send({
      success: true,
    });
  } catch (error) {
    switch (error.message) {
      case MESSAGES.USERNAME_OR_PASSWORD_EXISTS:
        res.status(HTTP_CODE.CONFLICT).send({
          success: false,
          data: MESSAGES.USERNAME_OR_PASSWORD_EXISTS,
        });
        break;
      default:
        next(error);
    }
  }
};

const renewToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { refreshToken } = req.headers;
    const { accessToken, refToken } = await UserService.renewToken(
      String(refreshToken)
    );

    res.status(HTTP_CODE.OK).send({
      success: true,
      data: {
        accessToken,
        refreshToken: refToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const signout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { refreshtoken } = req.headers;

    await UserService.signout(String(refreshtoken));

    res.status(HTTP_CODE.OK).send({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  signup,
  signin,
  renewToken,
  signout,
};
