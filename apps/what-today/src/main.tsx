import './index.css';

import QueryProvider from '@libs/queryProvider';
import { Toaster } from '@what-today/design-system';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import router from './routes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <Toaster />
      <RouterProvider router={router} />
    </QueryProvider>
  </StrictMode>,
);
