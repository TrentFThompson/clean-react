// This provider is the core of the entire framework
// in one spot (main.tsx in the sample app)
// you wrap this around the rest of your jsx,
// and now your custom hooks and components can access all of your services
// via context, not caring about the implementation of the service that has been injected

import { ReactNode } from 'react';

import { IAuthService, IDataService, ILoggingService } from '../core';

import { AuthProvider } from './AuthContext';
import { DataProvider } from './DataContext';
import { LoggingProvider } from './LoggingProvider';

export function CleanReactProvider({
    authService,
    dataService,
    loggingService,
    children,
}: {
    authService?: IAuthService;
    dataService?: IDataService;
    loggingService?: ILoggingService;
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
