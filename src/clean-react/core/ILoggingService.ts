export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface ILoggingService {
    log(level: LogLevel, message: string, meta?: Record<string, any>): void;

    debug(message: string, meta?: Record<string, any>): void;
    info(message: string, meta?: Record<string, any>): void;
    warn(message: string, meta?: Record<string, any>): void;
    error(message: string, meta?: Record<string, any>): void;
}
