import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { AuthSession, IAuthService } from '@/core';

export type AuthContextValue = {
    session: AuthSession | null;
    authService: IAuthService;
    isAuthenticated: boolean;
    startAuthFlow?: IAuthService['startAuthFlow'];
    completeAuthFlow?: IAuthService['completeAuthFlow'];
    loginWithCredentials?: IAuthService['loginWithCredentials'];
    logout?: IAuthService['logout'];
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({
    authService,
    children,
}: {
    authService: IAuthService;
    children: ReactNode;
}) {
    const [session, setSession] = useState<AuthSession | null>(null);

    useEffect(() => {
        authService.getSession().then(setSession);
        const unsub = authService.subscribe(setSession);
        return unsub;
    }, [authService]);

    const value: AuthContextValue = {
        session,
        authService,
        startAuthFlow: authService.startAuthFlow?.bind(authService),
        completeAuthFlow: authService.completeAuthFlow?.bind(authService),
        loginWithCredentials: authService.loginWithCredentials?.bind(authService),
        logout: authService.logout?.bind(authService),
        isAuthenticated: !!session?.user && !!session?.token,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
