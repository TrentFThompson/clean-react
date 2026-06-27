import { ReactNode } from 'react';

import { IAuthService, IDataService, ILoggingService } from '../core';

import { AuthProvider } from './AuthContext';
import { DataProvider } from './DataContext';
import { LoggingProvider } from './LoggingProvider';

export type CleanReactContext = {
    authService?: IAuthService;
    dataService?: IDataService;
    loggingService?: ILoggingService;
};

export function CleanReactProvider({
    authService,
    dataService,
    loggingService,
    children,
}: CleanReactContext & {
    children: ReactNode;
}) {
    let tree = children;

    if (authService) {
        tree = <AuthProvider authService={authService}>{tree}</AuthProvider>;
    }
    if (dataService) {
        tree = <DataProvider dataService={dataService}>{tree}</DataProvider>;
    }
    if (loggingService) {
        tree = <LoggingProvider loggingService={loggingService}>{tree}</LoggingProvider>;
    }

    return tree;
}
