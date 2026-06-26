import { createContext, ReactNode, useContext } from 'react';
import { IDataService } from '../../core';

type DataContextValue = {
    dataService: IDataService;
};

const DataContext = createContext<DataContextValue | undefined>(undefined);

export function useDataContext() {
    const ctx = useContext(DataContext);

    if (!ctx?.dataService) {
        throw new Error(
            'Data service not provided. Pass `dataService={...}` to <CleanReactProvider>.',
        );
    }

    return ctx.dataService;
}

export function DataProvider({
    dataService,
    children,
}: {
    dataService: IDataService;
    children: ReactNode;
}) {
    const value: DataContextValue = {
        dataService,
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
