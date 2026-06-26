export class NotFoundError extends Error {
    constructor(
        message = 'Not found',
        public cause?: unknown,
    ) {
        super(message);
        this.name = 'NotFoundError';
    }
}

export class UnauthorizedError extends Error {
    constructor(
        message = 'Unauthorized',
        public cause?: unknown,
    ) {
        super(message);
        this.name = 'UnauthorizedError';
    }
}

export class ValidationError extends Error {
    constructor(
        message = 'Validation failed',
        public cause?: unknown,
    ) {
        super(message);
        this.name = 'ValidationError';
    }
}

export class ServiceError extends Error {
    constructor(
        message = 'Service failed',
        public cause?: unknown,
    ) {
        super(message);
        this.name = 'ServiceError';
    }
}
