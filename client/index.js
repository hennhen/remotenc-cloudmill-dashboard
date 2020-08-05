import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import './index.css';
import { SocketContextProvider, UserContextProvider } from './context';

ReactDOM.render(
  <UserContextProvider>
    <SocketContextProvider>
      <App />
    </SocketContextProvider>
  </UserContextProvider>,
  document.getElementById('root')
);
