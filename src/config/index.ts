import dotenv from "dotenv";
dotenv.config();

interface Config {
  port: number;
  developerMode: boolean;
  signature: string;
  savePath: string;
  pageSize: number;
  mongodb: {
    userName: string;
    password: string;
    hostname: string;
    databaseName: string;
  };
}

const config: Config = {
  port: Number(process.env.PORT),
  developerMode: Boolean(process.env.DEVELOPER_MODE),
  signature: String(process.env.SIGNATURE),
  savePath: process.env.SAVE_PATH,
  pageSize: Number(process.env.PAGE_SIZE),
  mongodb: {
    userName: process.env.MONGO_USER,
    password: process.env.MONGO_PASS,
    hostname: process.env.MONGO_HOST,
    databaseName: process.env.MONGO_DATABASE,
  },
};

export default config;
