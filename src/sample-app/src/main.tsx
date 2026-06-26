import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { CleanReactProvider } from 'clean-react/react';
import { MockAuthService } from 'clean-react/services';

import { App } from './App.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <CleanReactProvider authService={new MockAuthService()}>
            <App />
        </CleanReactProvider>
    </StrictMode>,
);
