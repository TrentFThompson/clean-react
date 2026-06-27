import { createContext, useContext } from 'react';
import { ILoggingService } from '../core';

type LoggingContextValue = {
    loggingService: ILoggingService;
};

const LoggingContext = createContext<LoggingContextValue | null>(null);

export function useLoggingContext() {
    const ctx = useContext(LoggingContext);
    if (!ctx) {
        throw new Error(
            'Logging service not provided. Pass `loggingService={...}` to <CleanReactProvider>.',
        );
    }
    return ctx;
}

export function LoggingProvider({
    loggingService,
    children,
}: {
    loggingService: ILoggingService;
    children: React.ReactNode;
}) {
    return <LoggingContext.Provider value={{ loggingService }}>{children}</LoggingContext.Provider>;
}
