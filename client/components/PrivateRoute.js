import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../context';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { email } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        email ? <Component {...props} /> : <Redirect to={{ pathname: '/' }} />
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func
};

export default PrivateRoute;
