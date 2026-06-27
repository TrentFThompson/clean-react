import { useEffect, useState } from 'react';
import { useDataContext, useLoggingContext } from '../../clean-react/react';

export type Item = {
    id: string;
    text: string;
};

export function useItems() {
    const { dataService } = useDataContext();
    const { loggingService } = useLoggingContext();

    const [items, setItems] = useState<Array<Item> | null>(null);
    const [loading, setLoading] = useState(true);

    async function load() {
        setLoading(true);
        try {
            const result = await dataService.list<Item>('items');
            setItems(result);
            loggingService.info('Loaded items', { count: result.length });
        } catch (err) {
            loggingService.error('Failed to load items', { err });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    return { items, loading, reload: load };
}
