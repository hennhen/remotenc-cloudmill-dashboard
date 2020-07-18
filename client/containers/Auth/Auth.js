import React from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const Auth = ({ history }) => {
  return (
    <>
      <p>Auth Page</p>
      <Button
        color='primary'
        variant='contained'
        onClick={() => {
          history.push('/dashboard');
        }}
      >
        Login
      </Button>
    </>
  );
};

Auth.propTypes = {
  history: PropTypes.object
};

export default Auth;
