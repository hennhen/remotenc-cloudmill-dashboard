import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import './index.css';
import {
  SocketContextProvider,
  UserContextProvider,
  AlertContextProvider,
  JobContextProvider
} from './context';

ReactDOM.render(
  <UserContextProvider>
    <SocketContextProvider>
      <AlertContextProvider>
        <JobContextProvider>
          <App />
        </JobContextProvider>
      </AlertContextProvider>
    </SocketContextProvider>
  </UserContextProvider>,
  document.getElementById('root')
);
