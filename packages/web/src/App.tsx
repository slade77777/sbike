import React, {Suspense} from 'react';
import {AuthProvider} from './context/auth-context';
import Home from './pages/Home';

export default function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <div style={{padding: 20}}>
          <Home />
        </div>
      </Suspense>
    </AuthProvider>
  );
}
