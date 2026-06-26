import { useState } from 'react';

export function LoginForm({
    onLogin,
}: {
    onLogin: (email: string, password: string) => Promise<any>;
}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);

        try {
            await onLogin(email, password);
        } catch (err) {
            setError('Invalid credentials');
        }
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <input
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button type="submit">Login</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
