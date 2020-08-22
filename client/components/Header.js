import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks';
import { Typography, Button, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

import { rem } from 'polished';

const Header = ({ company }) => {
  const { setAuth } = useAuth();
  const history = useHistory();

  return (
    <Grid container style={{ marginBottom: rem('12px') }}>
      <Grid item xs={4}>
        <Typography variant='h5'>RemoteNC Cloud Mill</Typography>
      </Grid>
      <Grid item xs={4}>
        <Grid container justify='center'>
          <Typography variant='h5' style={{ fontWeight: 500 }}>
            {company}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Grid container justify='flex-end'>
          <Button
            color='primary'
            variant='contained'
            onClick={async () => {
              await setAuth();
              history.push('/');
            }}
          >
            DISCONNECT
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  company: PropTypes.string
};

export default Header;
