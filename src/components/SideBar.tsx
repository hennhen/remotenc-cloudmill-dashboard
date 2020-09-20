import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { CircularProgressWithLabel, Circle } from './index';
import { green } from '@material-ui/core/colors';

type SideBarProps = {
  name: string;
};

const SideBar = ({ name }: SideBarProps) => {
  return (
    <Grid
      container
      direction='column'
      justify='space-between'
      alignItems='center'
      spacing={3}
    >
      <Grid item>
        <Typography variant='h5' align='center'>
          {name}
        </Typography>
      </Grid>
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
          <Circle color={green[500]} />
          <Typography variant='h5'>Running</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export { SideBar };
