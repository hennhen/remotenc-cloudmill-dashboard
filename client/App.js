import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import { Auth, Dashboard } from './containers';
import { SocketContext } from './context';
import { PrivateRoute } from './components';
import { useAuth } from './hooks';

axios.defaults.baseURL = 'http://localhost:3333';

const App = () => {
  const { setSocket } = useContext(SocketContext);
  const { setAuth } = useAuth();

  useEffect(() => {
    setAuth(localStorage.token);
    const socketConnect = async () => {
      const socket = await io('0.0.0.0:3333');
      socket.on('connect', () => {
        setSocket(socket);
      });
    };

    socketConnect();
  }, []);

  const routes = (
    <Switch>
      <PrivateRoute path='/dashboard' component={Dashboard} />
      <Route path='/' component={Auth} />
    </Switch>
  );

  return <BrowserRouter>{routes}</BrowserRouter>;
};

export default App;
