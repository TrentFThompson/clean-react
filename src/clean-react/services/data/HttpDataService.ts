import {
    NotFoundError,
    UnauthorizedError,
    ValidationError,
    ServiceError,
    IAuthService,
    IDataService,
} from '../../core';

export class HttpDataService implements IDataService {
    constructor(
        private baseUrl: string,
        private authService?: IAuthService, // optional
    ) {}

    private async request<T>(path: string, options?: RequestInit): Promise<T> {
        let token: string | null = null;

        // Only fetch token if an auth service was provided
        if (this.authService) {
            try {
                const session = await this.authService.getSession();
                token = session?.token ?? null;
            } catch (err) {
                // If auth service fails, treat it as a service error
                throw new ServiceError('Failed to retrieve auth session', err);
            }
        }

        let res: Response;

        try {
            res = await fetch(`${this.baseUrl}/${path}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                ...options,
            });
        } catch (err) {
            throw new ServiceError('Network failure', err);
        }

        // Domain error mapping
        if (res.status === 404) throw new NotFoundError();
        if (res.status === 401) throw new UnauthorizedError();
        if (res.status === 400) {
            const body = await res.json().catch(() => null);
            throw new ValidationError(body?.message ?? 'Validation failed');
        }

        if (!res.ok) {
            throw new ServiceError(`Unexpected status ${res.status}`);
        }

        // Parse JSON safely
        try {
            return await res.json();
        } catch (err) {
            throw new ServiceError('Invalid JSON response', err);
        }
    }

    get<T>(key: string, params?: unknown): Promise<T> {
        return this.request<T>(key);
    }

    list<T>(key: string, params?: unknown): Promise<T[]> {
        return this.request<T[]>(key);
    }

    create<T>(key: string, data: unknown): Promise<T> {
        return this.request<T>(key, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    update<T>(key: string, data: unknown): Promise<T> {
        return this.request<T>(key, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }

    remove(key: string, params?: unknown): Promise<void> {
        return this.request<void>(key, { method: 'DELETE' });
    }
}
