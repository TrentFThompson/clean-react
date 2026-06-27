// services/SentryLoggingService.ts
// import * as Sentry from '@sentry/browser';

// export class SentryLoggingService implements ILoggingService {
//     log(level: LogLevel, message: string, meta?: Record<string, any>) {
//         Sentry.captureMessage(message, {
//             level,
//             extra: meta,
//         });
//     }

//     debug(message: string, meta?: Record<string, any>) {
//         this.log('debug', message, meta);
//     }
//     info(message: string, meta?: Record<string, any>) {
//         this.log('info', message, meta);
//     }
//     warn(message: string, meta?: Record<string, any>) {
//         this.log('warn', message, meta);
//     }
//     error(message: string, meta?: Record<string, any>) {
//         this.log('error', message, meta);
//     }
// }

// Example but not yet implemented, didn't feel like installing the package
