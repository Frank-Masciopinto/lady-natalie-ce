import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';

// Context
import FavoritesProvider from './context/FavoritesProvider';
import ToastsProvider from './context/ToastsProvider';
import ThemeProvider from './context/ThemeProvider';

// Components
import App from './App';

import './static/css/index.css';

const rootElement = document.getElementById('root');
console.log('rootElement', rootElement);
console.log('createRoot');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <FavoritesProvider>
            <ToastsProvider>
              <App />
            </ToastsProvider>
          </FavoritesProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
