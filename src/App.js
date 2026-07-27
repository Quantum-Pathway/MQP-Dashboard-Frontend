/**
 * App.js - Main application component defining routes and provider wrappers
 */

import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@utils/query';
import router from './router';
import "./App.scss";

function App() {
  // Wrap app with React Query provider for data fetching and router for navigation
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
