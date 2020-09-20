import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {
  UserContextProvider,
  AlertContextProvider,
  JobContextProvider
} from './context';

ReactDOM.render(
  <UserContextProvider>
    <AlertContextProvider>
      <JobContextProvider>
        <App />
      </JobContextProvider>
    </AlertContextProvider>
  </UserContextProvider>,
  document.getElementById('root')
);
