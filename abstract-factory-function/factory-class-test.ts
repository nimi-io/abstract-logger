import { createLogger } from "./factory-class";

const logger = createLogger();

logger.debug("debug logging");
logger.info("info logging");
logger.warn("warn logging");
logger.error("error logging");

