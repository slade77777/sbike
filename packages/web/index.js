import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {setupBusinessLayer} from 'shared-logic';
import App from './src/App';

setupBusinessLayer(process.env.API_URL || 'http://sbike.bytech.vn:2650/api');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
