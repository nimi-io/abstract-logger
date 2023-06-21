import { LoggerFactory } from "./factory-class";

const logger = LoggerFactory.createLogger();

logger.debug("debug logging");
logger.info("info logging");
logger.warn("warn logging");
logger.error("error logging");

