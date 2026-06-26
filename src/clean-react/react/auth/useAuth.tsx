import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export function useAuth() {
    const ctx = useContext(AuthContext);

    if (!ctx?.authService) {
        throw new Error(
            'Auth service not provided. Pass `authService={...}` to <CleanReactProvider>`.',
        );
    }

    return ctx;
}
