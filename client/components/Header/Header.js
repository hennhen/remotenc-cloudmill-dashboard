import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Typography, Button, Grid } from '@material-ui/core';
import { rem } from 'polished';

const Header = ({ history }) => {
  return (
    <Grid container style={{ marginBottom: rem('12px') }}>
      <Grid container xs={4}>
        <Typography variant='h5'>RemoteNC Cloud Mill</Typography>
      </Grid>
      <Grid container xs={4} justify='center'>
        <Typography variant='h5' style={{ fontWeight: 500 }}>
          Job Name / Company Name
        </Typography>
      </Grid>
      <Grid container xs={4} justify='flex-end'>
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
  );
};

Header.propTypes = {
  history: PropTypes.object
};

export default withRouter(Header);
