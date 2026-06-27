import { useState } from 'react';

import { useItems } from './useItem';
import { useCreateItem } from './useCreateItem';
import { useUsername } from './useUsername';

export function Demo() {
    const { items, loading, reload } = useItems();
    const { create, creating } = useCreateItem();
    const username = useUsername();

    const [text, setText] = useState('');

    async function handleCreate(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!text.trim()) return;

        await create(text, reload);
        setText('');
    }

    return (
        <div>
            <h1>Hello {username}</h1>
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
