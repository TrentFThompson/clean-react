export class NotFoundError extends Error {}
export class UnauthorizedError extends Error {}
export class ValidationError extends Error {}
export class ServiceError extends Error {
    constructor(
        message = 'Service failed',
        public cause?: unknown,
    ) {
        super(message);
        this.name = 'ServiceError';
    }
}
