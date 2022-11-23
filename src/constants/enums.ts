export enum HTTP_CODE {
  OK = 200,
  CREATED = 201,
  CONFLICT = 409,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

export enum LOG_LABELS {
  APP_START = "APP_START",
  SHUTDOWN = "SHUTDOWN",
  UNHANDLED_ERROR = "UNHANDLED_ERROR",
  MONGODB_CONNECTION = "MONGODB_CONNECTION",
}

export enum MESSAGES {
  USERNAME_OR_PASSWORD_EXISTS = "Username or password exists",
  PASSWORD_IS_WRONG = "Password is wrong",
  USER_NOT_FOUND = "User not found",
  UNKNOWN_INTERNAL_ERROR = "Unknown Internal error",
  USER_UNAUTHORIZED = "User unauthorized",
  TOKEN_IS_REQUIRED = "Token is required",
  TOKEN_IS_INVALID = "Token is invalid",
  FILE_IS_REQUIRED = "File is required",
  FILE_NAME_IS_REQUIRED = "File name is required",
  FILE_TYPE_MUST_BE_JS_OR_CSS = "File type must be JS or CSS",
  FILE_EXTENSION_IS_NOT_MATCH_WITH_UPLOADED_CONTENT_TYPE = "File extenSion is not mach with uploaded content type",
}

export enum MIME_TYPES {
  JS = "application/javascript",
  CSS = "text/css",
}

export enum FILE_EXTENSIONS {
  CSS = ".css",
  JS = ".js",
}
