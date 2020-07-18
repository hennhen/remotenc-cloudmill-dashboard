import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Typography, Button, Grid } from '@material-ui/core';
import { rem } from 'polished';

const Header = ({ history }) => {
  return (
    <Grid container style={{ marginBottom: rem('12px') }}>
      <Grid item xs={4}>
        <Typography variant='h5'>RemoteNC Cloud Mill</Typography>
      </Grid>
      <Grid item xs={4}>
        <Grid container justify='center'>
          <Typography variant='h5' style={{ fontWeight: 500 }}>
            Job Name / Company Name
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Grid container justify='flex-end'>
          <Button
            color='primary'
            variant='contained'
            onClick={() => {
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
  history: PropTypes.object
};

export default withRouter(Header);
