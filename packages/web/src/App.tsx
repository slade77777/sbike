import React, {Suspense} from 'react';
import {Spin} from 'antd';
import {AuthProvider} from './context/auth-context';
import Home from './pages/Home';

export default function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<Spin />}>
        <Home />
      </Suspense>
    </AuthProvider>
  );
}
