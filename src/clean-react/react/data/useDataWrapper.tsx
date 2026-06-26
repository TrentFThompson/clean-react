import { useEffect, useState } from 'react';

export function useDataWrapper<T>(fn: () => Promise<T>, deps: any[]) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    async function run() {
        setLoading(true);
        setError(null);

        try {
            const result = await fn();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Unknown error'));
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        run();
    }, deps);

    return { data, loading, error, refetch: run };
}
