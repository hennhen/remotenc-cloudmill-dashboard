import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import { Auth, Dashboard } from './containers';
import { SocketContext, UserContext } from './context';
import { PrivateRoute } from './components';
import { useAuth } from './hooks';

axios.defaults.baseURL = 'http://localhost:3333/api';

const App = () => {
  const { email } = useContext(UserContext);
  const { setSocket } = useContext(SocketContext);
  const { setAuth } = useAuth();
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    const auth = async () => {
      const response = await setAuth(localStorage.token);
      if (response) setRedirect(<Redirect to='/dashboard' />);
    };

    const socketConnect = async () => {
      try {
        const socket = await io('http://localhost:3333');
        socket.on('connect', () => {
          setSocket(socket);
          auth();
        });
      } catch (err) {
        console.error(err);
      }
    };

    socketConnect();
  }, []);

  useEffect(() => {
    if (!email) setRedirect(null);
  }, [email]);

  const routes = (
    <Switch>
      <PrivateRoute path='/dashboard' component={Dashboard} />
      <Route path='/'>{redirect || <Auth />}</Route>
    </Switch>
  );

  return <BrowserRouter>{routes}</BrowserRouter>;
};

export default App;
