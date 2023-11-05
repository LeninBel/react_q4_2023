import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from './components/errorBoundary/ErrorBoundary.tsx';
import { RouterProvider } from 'react-router-dom';
import { router } from './components/router/AppRouter.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </RouterProvider>
  </React.StrictMode>
);
