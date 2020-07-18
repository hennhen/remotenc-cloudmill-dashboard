import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { CircularProgressWithLabel } from '..';
import styled from 'styled-components';
import { rem } from 'polished';
import { green } from '@material-ui/core/colors';

const Circle = styled.div`
  height: ${rem('50px')};
  width: ${rem('50px')};
  background-color: ${() => {
    return green[500];
  }};
  border-radius: 50%;
  margin-right: ${rem('15px')};
`;

const SideBar = () => {
  return (
    <Grid
      container
      direction='column'
      justify='space-between'
      alignItems='center'
      spacing={3}
    >
      <Grid item>
        <CircularProgressWithLabel value={100} />
      </Grid>
      <Grid item>
        <Typography variant='h5'>Est. Time Left:</Typography>
      </Grid>
      <Grid item>
        <Typography variant='h5'>00:00:00</Typography>
      </Grid>
      <Grid item style={{ marginRight: 'auto' }}>
        <Typography variant='h5' style={{ fontWeight: 500 }}>
          Status:
        </Typography>
      </Grid>
      <Grid item style={{ marginRight: 'auto' }}>
        <Grid
          container
          direction='row'
          justify='flex-start'
          alignItems='center'
        >
          <Circle />
          <Typography variant='h5'>Running</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SideBar;
