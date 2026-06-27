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

// Example usage:
// const logging = new MultiLoggingService([
//   new ConsoleLoggingService(),
//   new SentryLoggingService(),
// ]);

// Now you can inject multiple loggers into the app in different configurations
