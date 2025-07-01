import { web } from "./utils/database/web.js";
import { logger } from "./utils/database/logging.js";

const port = 5000;

web.listen(port, () => {
  logger.info(`Server running on port ${port}`); // eslint-disable-line no-console
});
