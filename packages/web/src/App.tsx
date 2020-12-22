import React from 'react';
import {QueryCache, ReactQueryCacheProvider} from 'react-query';
import {AuthProvider} from './context/auth-context';
import Home from './pages/Home';
import {ModalProvider} from './context/modal-context';
import {GlobalProvider} from './context/devices-context';

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
        <GlobalProvider>
          <ModalProvider>
            <Home />
          </ModalProvider>
        </GlobalProvider>
      </AuthProvider>
    </ReactQueryCacheProvider>
  );
}
