import { useState } from 'react';
import { useDataContext, useLoggingContext } from '../../clean-react/react';

export function useCreateItem() {
    const { dataService } = useDataContext();
    const { loggingService } = useLoggingContext();

    const [creating, setCreating] = useState(false);

    async function create(text: string, reload: () => void) {
        setCreating(true);
        try {
            await dataService.create('items', { text });
            loggingService.info('Created item', { text });
            reload();
        } catch (err) {
            loggingService.error('Failed to create item', { err });
        } finally {
            setCreating(false);
        }
    }

    return { create, creating };
}
