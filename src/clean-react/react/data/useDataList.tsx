import { useDataContext } from './DataContext';
import { useDataWrapper } from './useDataWrapper';

export function useDataList<T>(key: string, params?: unknown) {
    const dataService = useDataContext();

    return useDataWrapper<T[]>(
        () => dataService.list<T>(key, params),
        [key, JSON.stringify(params)],
    );
}
