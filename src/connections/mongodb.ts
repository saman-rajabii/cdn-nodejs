import mongoose from "mongoose";
import config from "../config";
import { logger } from "../../utils";
import { LOG_LABELS } from "../constants/enums";

const { userName, password, hostname, databaseName } = config.mongodb;

let connectionString: string;

const mongoOptions: mongoose.ConnectOptions = {
  connectTimeoutMS: 3000,
};

if (userName && password) {
  mongoOptions.maxPoolSize = 20;
  mongoOptions.socketTimeoutMS = 3000;

  connectionString = `mongodb://${userName}:${password}@${hostname}/${databaseName}`;
} else {
  connectionString = `mongodb://${hostname}/${databaseName}`;
}
try {
  mongoose.connect(connectionString, mongoOptions);
} catch (error) {
  logger.error(
    LOG_LABELS.MONGODB_CONNECTION,
    "Mongodb Connection Error: ",
    error
  );
}

mongoose.connection.on("connected", () => {
  if (process.send) {
    process.send("ready");
  }
});

mongoose.connection.on("error", (error) => {
  logger.error(LOG_LABELS.MONGODB_CONNECTION, "Connection Error: ", error);
  throw new Error(`unable to connect to mongo db: ${connectionString}`);
});

export default mongoose;
