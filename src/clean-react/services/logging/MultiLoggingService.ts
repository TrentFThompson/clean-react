// This file shows how you can inject multiple logging services into
// one class that implements the ILoggingService, and now your consuming code will
// be writing to 2 log services without changing anything

// Example usage:
// const logging = new MultiLoggingService([
//   new ConsoleLoggingService(),
//   new SentryLoggingService(),
// ]);

import { ILoggingService, LogLevel } from '../../core';

export class MultiLoggingService implements ILoggingService {
    constructor(private readonly loggers: ILoggingService[]) {}

    log(level: LogLevel, message: string, meta?: Record<string, any>) {
        for (const logger of this.loggers) {
            logger.log(level, message, meta);
        }
    }

    debug(message: string, meta?: Record<string, any>) {
        this.log('debug', message, meta);
    }
    info(message: string, meta?: Record<string, any>) {
        this.log('info', message, meta);
    }
    warn(message: string, meta?: Record<string, any>) {
        this.log('warn', message, meta);
    }
    error(message: string, meta?: Record<string, any>) {
        this.log('error', message, meta);
    }
}
