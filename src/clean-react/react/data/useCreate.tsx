import { useState } from 'react';
import { useDataContext } from './DataContext';
import { ServiceError } from '../../core';

export function useCreate<T>(key: string) {
    const dataService = useDataContext();

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    async function mutate(input: unknown) {
        setLoading(true);
        setError(null);

        try {
            const result = await dataService.create<T>(key, input);
            setData(result);
            return result;
        } catch (err) {
            const e = err instanceof Error ? err : new ServiceError('Unknown error', err);
            setError(e);
            throw e;
        } finally {
            setLoading(false);
        }
    }

    return { mutate, data, loading, error };
}
