import app from "./app";
import config from "./src/config";
import { logger } from "./utils";
import { LOG_LABELS } from "./src/constants/enums";

function init() {
  const server = app.listen(config.port, () => {
    logger.info(
      LOG_LABELS.APP_START,
      `🔥 App is running at http://localhost:${config.port}`
    );
  });

  function shutdown() {
    let err = 0;
    server.close(async (e) => {
      if (e) {
        err = 1;
        logger.error(LOG_LABELS.SHUTDOWN, `Server is down with error`, e);
      }

      logger.info(LOG_LABELS.SHUTDOWN, "Server is down");
    });

    return process.exit(err);
  }

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
  process.on("SIGQUIT", shutdown);
}

export default init();
