/* eslint-disable no-unused-expressions */
import morgan from 'morgan';
import { createLogger, format, transports } from 'winston';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const { combine, timestamp, prettyPrint } = format;
const logDirectory = join(__dirname, 'log');
const isDevelopment = process.env.NODE_ENV === 'development';

const loggerOptions = {
  file: {
    level: 'info',
    filename: `${logDirectory}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};
const loggerTransports = [
  new transports.Console({
    ...loggerOptions.console,
    format: format.combine(
      format.timestamp(),
      format.colorize({ all: true }),
      format.align(),
      format.printf((info) => {
        const {
          timestamp: timeStamp, level, message, ...args
        } = info;

        // const ts = timestamp.slice(0, 19).replace('T', ' ');
        return `${timeStamp} ${level}: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
      }),
    ),
  }),
];

class AppLogger {
  constructor(options) {
    if (!isDevelopment) {
      if (!(existsSync(logDirectory))) mkdirSync(logDirectory);
    }

    this.logger = createLogger({
      transports: isDevelopment
        ? [...loggerTransports]
        : [
          ...loggerTransports,
          new transports.File({
            ...options.file,
            format: combine(timestamp(), prettyPrint()),
          }),
        ],
      exitOnError: false,
    });
  }
}

const { logger: winston } = new AppLogger(loggerOptions);

const logger = () => morgan('combined', {
  skip: (_, res) => res.statusCode >= 200 && res.statusCode < 300,
  stream: {
    write: (message, meta) => winston.info(message, meta),
  },
});

export {
  winston,
  logger as default,
};
