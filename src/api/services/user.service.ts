import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, IUser, Token } from "../../models";
import { MESSAGES } from "../../constants/enums";
import { pick } from "lodash";
import config from "../../config";

export default {
  async generateToken(data: Partial<IUser>, expire: string): Promise<string> {
    const payload = pick(data, ["_id", "username"]);

    const token = jwt.sign(payload, config.signature, {
      expiresIn: expire,
    });

    return token;
  },

  async createUser(data: Partial<IUser>): Promise<string> {
    const hashedPassword = await bcrypt.hash(String(data.password), 10);

    const user = await User.findOne({ username: data.username });

    if (user) {
      throw new Error(MESSAGES.USERNAME_OR_PASSWORD_EXISTS);
    }

    const newUser = await User.create({ ...data, password: hashedPassword });

    return newUser.username;
  },

  async signin(data: { username: string; password: string }): Promise<any> {
    const user = await User.findOne({
      username: data.username,
    });

    if (!user) {
      throw new Error(MESSAGES.USER_NOT_FOUND);
    }

    const passwordMach = await bcrypt.compare(
      data.password,
      String(user?.password)
    );

    if (!passwordMach) {
      throw new Error(MESSAGES.PASSWORD_IS_WRONG);
    }

    const accessToken = await this.generateToken(user, "1d");
    const refreshToken = await this.generateToken(user, "30d");

    const userToken = await Token.findOne({ userId: user?._id });

    if (userToken) await userToken.remove();

    await Token.create({
      userId: user?._id,
      token: refreshToken,
    });

    return {
      accessToken,
      refreshToken,
    };
  },

  async renewToken(refToken: string): Promise<any> {
    try {
      const userToken = await Token.findOne({ token: refToken });

      if (!userToken) {
      }

      const payload = jwt.verify(refToken, config.signature);

      const accessToken = await this.generateToken(payload, "1d");
      const refreshToken = await this.generateToken(payload, "30d");

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw error;
    }
  },

  async signout(refToken: string): Promise<void> {
    try {
      const userToken = await Token.findOne({ token: refToken });

      if (userToken) {
        await userToken.remove();
      }
    } catch (error) {
      throw error;
    }
  },
};
