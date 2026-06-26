import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { CleanReactProvider } from '../../clean-react/react';
import { MockAuthService, MockDataService } from '../../clean-react/services';

import { App } from './App.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <CleanReactProvider
            authService={new MockAuthService()}
            dataService={
                new MockDataService({
                    items: [{ id: '1', text: 'Hello world' }],
                })
            }
        >
            <App />
        </CleanReactProvider>
    </StrictMode>,
);
