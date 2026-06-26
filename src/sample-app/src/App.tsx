import { useAuthContext } from '../../clean-react/react';
import { LoginForm } from './LoginForm';
import { DataDemo } from './DataDemo';

export function App() {
    const { isAuthenticated, loginWithCredentials } = useAuthContext();
    if (!isAuthenticated) {
        return <LoginForm onLogin={loginWithCredentials!} />;
    }

    return <DataDemo />;
}
