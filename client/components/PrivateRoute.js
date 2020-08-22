import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../context';
import { Header } from './';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <>
            <Header company={user.company} />
            <Component {...props} />
          </>
        ) : (
          <Redirect to={{ pathname: '/' }} />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func
};

export default PrivateRoute;
