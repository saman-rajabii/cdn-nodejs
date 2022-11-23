import core from "express-serve-static-core";
import { User } from "../api/services/types";

interface Result {
  success?: boolean;
  data?: any;
  count?: number | Record<string, number>;
  message?: string;
  details?: any;
}

declare module "express" {
  export type CustomSend<ResBody = any, T = Response<ResBody>> = (
    body: Result
  ) => T;

  export interface Response {
    send: CustomSend<any, this>;
  }
  export interface Request {
    user?: User;
  }
}