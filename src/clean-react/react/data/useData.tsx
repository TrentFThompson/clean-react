import { useDataContext } from './DataContext';
import { useDataWrapper } from './useDataWrapper';

export function useData<T>(key: string, params?: unknown) {
    const dataService = useDataContext();

    return useDataWrapper<T>(() => dataService.get<T>(key, params), [key, JSON.stringify(params)]);
}
