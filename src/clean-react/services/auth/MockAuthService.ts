import { IAuthService, AuthSession, AuthSessionListener, Unsubscribe } from '../../core';

export class MockAuthService implements IAuthService {
    private session: AuthSession | null = null;
    private listeners: AuthSessionListener[] = [];

    async getSession(): Promise<AuthSession | null> {
        return this.session;
    }

    subscribe(listener: AuthSessionListener): Unsubscribe {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }

    async loginWithCredentials(email: string, password: string): Promise<AuthSession | null> {
        // Fake login flow
        this.session = {
            user: { email },
            token: 'stub-token',
        };
        this.notify();
        return this.session;
    }

    async logout(): Promise<void> {
        this.session = null;
        this.notify();
    }

    private notify() {
        for (const listener of this.listeners) {
            listener(this.session);
        }
    }
}
