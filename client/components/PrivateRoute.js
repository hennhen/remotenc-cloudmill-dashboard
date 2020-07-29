import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { SocketContext } from '../context';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { socket } = useContext(SocketContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        socket ? <Component {...props} /> : <Redirect to={{ pathname: '/' }} />
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func
};

export default PrivateRoute;
