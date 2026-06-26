import { useAuth } from 'clean-react/react';

export function App() {
    const auth = useAuth();
    console.log(auth);

    return <></>;
}
