import { useAuthContext } from '../../clean-react/react';
import { LoginForm } from './LoginForm';
import { DataDemo } from './DataDemo';

export function App() {
    const { isAuthenticated, loginWithCredentials } = useAuthContext();

    // If not logged in → show login form
    if (!isAuthenticated) {
        return <LoginForm onLogin={loginWithCredentials!} />;
    }

    // If logged in → show create + list
    return <DataDemo />;
}
