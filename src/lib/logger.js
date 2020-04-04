const { createLogger, format, transports } = require('winston');

const myFormat = format.printf(({ level, message, timestamp }) => `${timestamp} - ${level}: ${message}`);

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    myFormat,
  ),
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV === 'development') {
  logger.add(new transports.Console({
    format: format.combine(
      format.timestamp(),
      myFormat,
    ),
    colorize: true,
  }));
}

logger.stream = {
  write(message) {
    logger.info(message);
  },
};

module.exports = logger;
