import React, { useContext, FC } from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { UserContext } from '../context';
import { Header } from './Header';

type PrivateRouteProps = {
  component: FC<RouteComponentProps>;
  path?: string;
};

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
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

export { PrivateRoute };
