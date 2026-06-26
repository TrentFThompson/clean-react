import { useCreate, useDataList } from '../../clean-react/react';
import { useState } from 'react';

export function DataDemo() {
    const [text, setText] = useState('');

    const { data: items, loading, refetch } = useDataList<{ id: string; text: string }>('items');
    const { mutate: createItem, loading: creating } = useCreate<{ id: string; text: string }>(
        'items',
    );

    async function handleCreate(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!text.trim()) return;

        await createItem({ text });
        setText('');
        await refetch();
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
