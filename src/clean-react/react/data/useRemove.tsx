import { useState } from 'react';
import { useDataContext } from './DataContext';
import { ServiceError } from '../../core';

export function useRemove(key: string) {
    const dataService = useDataContext();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    async function remove(params?: unknown) {
        setLoading(true);
        setError(null);

        try {
            await dataService.remove(key, params);
        } catch (err) {
            const e = err instanceof Error ? err : new ServiceError('Unknown error', err);
            setError(e);
            throw e;
        } finally {
            setLoading(false);
        }
    }

    return { remove, loading, error };
}
