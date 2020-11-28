import React, {Suspense} from 'react';
import {LoadScript} from '@react-google-maps/api';
import {QueryCache, ReactQueryCacheProvider} from 'react-query';
import {Spin} from 'antd';
import {AuthProvider} from './context/auth-context';
import Home from './pages/Home';

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
      <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_KEY || ''}>
        <AuthProvider>
          <Suspense fallback={<Spin />}>
            <Home />
          </Suspense>
        </AuthProvider>
      </LoadScript>
    </ReactQueryCacheProvider>
  );
}
