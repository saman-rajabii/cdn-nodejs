import * as winston from "winston";
import { format } from "logform";

const { printf } = format;

const customFormatter = printf(
  ({ level, message, timestamp }) => `${timestamp} ${level} ${message}`
);

const options = {
  transports: [
    new winston.transports.Console({
      format: format.combine(format.timestamp(), customFormatter),
    }),
  ],
};
const logger = winston.createLogger(options);

export default class Logger {
  static error(
    label: string,
    info: Record<string, unknown> | string,
    error: Error
  ): void {
    logger.log("error", `[${label}]`, {
      info,
      error,
    });
  }

  static warn(
    label: string,
    message: Record<string, unknown> | string,
    meta?: Record<string, unknown>
  ): void {
    logger.log("warn", `[${label.toUpperCase()}]: ${message}`, {
      message: JSON.stringify(meta),
    });
  }

  static info(
    label: string,
    message: Record<string, unknown> | string,
    meta?: Record<string, unknown>
  ): void {
    logger.log("info", `[${label.toUpperCase()}]: ${message}`, {
      message: JSON.stringify(meta),
    });
  }

  static verbose(
    label: string,
    message: Record<string, unknown> | string,
    meta?: Record<string, unknown>
  ): void {
    logger.log("verbose", `[${label.toUpperCase()}]: ${message}`, {
      message: JSON.stringify(meta),
    });
  }

  static debug(
    label: string,
    message: Record<string, unknown> | string,
    meta?: Record<string, unknown>
  ): void {
    logger.log("debug", `[${label.toUpperCase()}]: ${message}`, {
      message: JSON.stringify(meta),
    });
  }

  static silly(
    label: string,
    message: Record<string, unknown> | string,
    meta?: Record<string, unknown>
  ): void {
    logger.log("silly", `[${label.toUpperCase()}]: ${message}`, {
      message: JSON.stringify(meta),
    });
  }
}
