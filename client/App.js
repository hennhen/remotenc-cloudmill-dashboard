import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import { Auth, Dashboard } from './containers';
import { SocketContext, UserContext, AlertContext } from './context';
import { PrivateRoute } from './components';
import { useAuth } from './hooks';

axios.defaults.baseURL = '/api';

const App = () => {
  const { user } = useContext(UserContext);
  const { setSocket } = useContext(SocketContext);
  const { setAlert } = useContext(AlertContext);
  const { setAuth } = useAuth();
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    const auth = async () => {
      const response = await setAuth(localStorage.token);
      if (response) setRedirect(<Redirect to='/dashboard' />);
    };

    const socketConnect = async () => {
      try {
        const socket = await io();
        socket.on('connect', () => {
          setSocket(socket);
          auth();
        });
      } catch (err) {
        setAlert({
          type: 'error',
          message: 'Unable to connect to server, please come back later.'
        });
      }
    };

    socketConnect();
  }, []);

  useEffect(() => {
    if (!user) setRedirect(null);
  }, [user]);

  const routes = (
    <Switch>
      <PrivateRoute path='/dashboard' component={Dashboard} />
      <Route path='/'>{redirect || <Auth />}</Route>
    </Switch>
  );

  return <BrowserRouter>{routes}</BrowserRouter>;
};

export default App;
