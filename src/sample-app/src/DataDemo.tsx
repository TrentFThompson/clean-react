import { useDataContext } from '../../clean-react/react';
import { useEffect, useState } from 'react';

export function DataDemo() {
    const { dataService } = useDataContext();

    const [items, setItems] = useState<Array<{ id: string; text: string }> | null>(null);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [text, setText] = useState('');

    // Load items on mount
    async function loadItems() {
        setLoading(true);
        try {
            const result = await dataService.list<{ id: string; text: string }>('items');
            setItems(result);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadItems();
    }, []);

    async function handleCreate(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!text.trim()) return;

        setCreating(true);
        try {
            await dataService.create('items', { text });
            setText('');
            await loadItems(); // refresh list
        } finally {
            setCreating(false);
        }
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>Items</h2>

            <form onSubmit={handleCreate}>
                <input
                    placeholder="new item"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button type="submit" disabled={creating}>
                    Add
                </button>
            </form>

            {loading && <p>Loading...</p>}

            <ul>
                {items?.map((item) => (
                    <li key={item.id}>{item.text}</li>
                ))}
            </ul>
        </div>
    );
}
