// useUsername.ts
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../clean-react/react';

export function useUsername() {
    const { authService } = useAuthContext();
    const [username, setUsername] = useState<string>('');

    useEffect(() => {
        let mounted = true;

        async function load() {
            const session = await authService.getSession();
            if (mounted) {
                setUsername(session?.user?.name ?? '');
            }
        }

        load();
        return () => {
            mounted = false;
        };
    }, [authService]);

    return username;
}
