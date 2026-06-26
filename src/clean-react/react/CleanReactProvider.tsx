import { ReactNode } from 'react';

import { IAuthService, IDataService } from '../core';

import { AuthProvider } from './auth';
import { DataProvider } from './data';

export type CleanReactContext = {
    authService?: IAuthService;
    dataService?: IDataService;
};

export function CleanReactProvider({
    authService,
    dataService,
    children,
}: {
    authService?: IAuthService;
    dataService?: IDataService;
    children: ReactNode;
}) {
    let tree = children;

    if (authService) {
        tree = <AuthProvider authService={authService}>{tree}</AuthProvider>;
    }
    if (dataService) {
        tree = <DataProvider dataService={dataService}>{tree}</DataProvider>;
    }

    return tree;
}
