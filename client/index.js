import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import './index.css';
import {
  SocketContextProvider,
  UserContextProvider,
  AlertContextProvider
} from './context';

ReactDOM.render(
  <UserContextProvider>
    <SocketContextProvider>
      <AlertContextProvider>
        <App />
      </AlertContextProvider>
    </SocketContextProvider>
  </UserContextProvider>,
  document.getElementById('root')
);
