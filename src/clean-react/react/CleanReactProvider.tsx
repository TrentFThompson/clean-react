import { ReactNode } from 'react';
import { IAuthService } from '@/core';
import { AuthProvider } from './auth';

export type CleanReactContext = {
    authService?: IAuthService;
};

export function CleanReactProvider({
    authService,
    children,
}: {
    authService?: IAuthService;
    children: ReactNode;
}) {
    let tree = children;

    if (authService) {
        tree = <AuthProvider authService={authService}>{tree}</AuthProvider>;
    }

    return tree;
}
