import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class Logger extends ConsoleLogger {
  private readonly winstonLogger: winston.Logger;

  constructor() {
    super();
    this.winstonLogger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.printf(({ timestamp, level, message, context }) => {
              return `${timestamp} [${context || 'Application'}] ${level}: ${message}`;
            }),
          ),
        }),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
      ],
    });
  }

  log(message: string, context?: string) {
    this.winstonLogger.info(message, { context });
    super.log(message, context);
  }

  error(message: string, trace?: string, context?: string) {
    this.winstonLogger.error(message, { trace, context });
    super.error(message, trace, context);
  }

  warn(message: string, context?: string) {
    this.winstonLogger.warn(message, { context });
    super.warn(message, context);
  }

  debug(message: string, context?: string) {
    this.winstonLogger.debug(message, { context });
    super.debug(message, context);
  }

  verbose(message: string, context?: string) {
    this.winstonLogger.verbose(message, { context });
    super.verbose(message, context);
  }
}