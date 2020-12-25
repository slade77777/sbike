import React from 'react';
import {QueryCache, ReactQueryCacheProvider} from 'react-query';
import {AuthProvider} from './context/auth-context';
import Home from './pages/Home';
import {ModalProvider} from './context/modal-context';

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <AuthProvider>
        <ModalProvider>
          <Home />
        </ModalProvider>
      </AuthProvider>
    </ReactQueryCacheProvider>
  );
}
