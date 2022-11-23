import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import config from "./src/config";
import routes from "./src/api/routes";
import { errorHandler } from "./src/middlewares";

const app = express();
app.set("port", config.port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use("/api/v1", routes);

app.use(errorHandler);

export default app;
