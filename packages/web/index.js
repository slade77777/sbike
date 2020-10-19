import React from 'react';
import ReactDOM from 'react-dom';
import {setupBusinessLayer} from 'shared-logic';

import App from './src/App';

setupBusinessLayer(process.env.API_URL || '');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
