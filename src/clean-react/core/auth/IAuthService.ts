import { AuthSession } from './AuthSession';

export type AuthSessionListener = (session: AuthSession | null) => void;
export type Unsubscribe = () => void;

export interface IAuthService {
    getSession(): Promise<AuthSession | null>;
    subscribe(listener: AuthSessionListener): Unsubscribe;
    startAuthFlow?(): Promise<void> | void;
    completeAuthFlow?(...args: unknown[]): Promise<unknown> | unknown;
    loginWithCredentials?(...args: unknown[]): Promise<AuthSession | null>;
    logout?(): Promise<void> | void;
}
