import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import './index.css';
import { SocketContextProvider } from './context';

ReactDOM.render(
  <SocketContextProvider>
    <App />
  </SocketContextProvider>,
  document.getElementById('root')
);
