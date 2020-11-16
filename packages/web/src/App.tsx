import React, {Suspense} from 'react';
import {QueryCache, ReactQueryCacheProvider} from 'react-query';
import {Spin} from 'antd';
import {AuthProvider} from './context/auth-context';
import Home from './pages/Home';

const queryCache = new QueryCache();

export default function App() {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <AuthProvider>
        <Suspense fallback={<Spin />}>
          <Home />
        </Suspense>
      </AuthProvider>
    </ReactQueryCacheProvider>
  );
}
