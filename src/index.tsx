import React from 'react';
import { createRoot } from 'react-dom/client';
import router from './router/Router';
import { RouterProvider } from 'react-router-dom';

const container = document.getElementById('root') as Element | DocumentFragment;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
