import { ILoggingService, LogLevel } from '../../core';

export class ConsoleLoggingService implements ILoggingService {
    log(level: LogLevel, message: string, meta?: Record<string, any>) {
        const payload = meta ? { message, meta } : message;

        switch (level) {
            case 'debug':
                console.debug(payload);
                break;
            case 'info':
                console.info(payload);
                break;
            case 'warn':
                console.warn(payload);
                break;
            case 'error':
                console.error(payload);
                break;
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
