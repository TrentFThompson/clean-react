import { AuthSession } from './AuthSession';

export type AuthSessionListener = (session: AuthSession | null) => void;
export type Unsubscribe = () => void;

export interface IAuthService {
    // required by AuthProvider
    getSession(): Promise<AuthSession | null>;
    subscribe(listener: AuthSessionListener): Unsubscribe;

    // optional in AuthProvider (exposed with optional chaining)
    startAuthFlow?(): Promise<void> | void;
    completeAuthFlow?(...args: unknown[]): Promise<unknown> | unknown;
    loginWithCredentials?(...args: unknown[]): Promise<AuthSession | null>;
    logout?(): Promise<void> | void;
}
