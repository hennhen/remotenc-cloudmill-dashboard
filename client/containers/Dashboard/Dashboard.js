import React from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const Dashbaord = ({ history }) => {
  return (
    <>
      <p>Dashbaord Page</p>
      <Button
        color='primary'
        variant='contained'
        onClick={() => {
          history.push('/');
        }}
      >
        Logout
      </Button>
    </>
  );
};

Dashbaord.propTypes = {
  history: PropTypes.object
};

export default Dashbaord;
