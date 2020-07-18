import React from 'react';
import { Container, Grid, Divider } from '@material-ui/core';

const Dashbaord = () => {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          HEADER
          <Divider />
        </Grid>
        <Grid item xs={2}>
          SideBar
        </Grid>
        <Divider orientation='vertical' flexItem />
        <Grid item xs={9}>
          Content
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashbaord;
