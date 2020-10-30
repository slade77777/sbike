import React, {Suspense} from 'react';
import {AuthProvider} from './context/auth-context';
import Home from './pages/Home';

export default function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    </AuthProvider>
  );
}
