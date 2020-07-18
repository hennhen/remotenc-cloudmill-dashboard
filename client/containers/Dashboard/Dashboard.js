import React from 'react';
import { Container, Grid, Divider } from '@material-ui/core';
import { Header, SideBar, Webcam, DataBox, GCodeBox } from '../../components';
import { rem } from 'polished';

const topheight = rem('420px');

const Dashbaord = () => {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Header />
          <Divider />
        </Grid>
        <Grid item xs={2}>
          <SideBar />
        </Grid>
        <Divider orientation='vertical' flexItem />
        <Grid item xs={9}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Grid
                container
                direction='column'
                justify='space-between'
                alignItems='stretch'
                style={{ height: topheight }}
              >
                <Grid item>
                  <Webcam />
                </Grid>
                <Grid item>
                  <Webcam />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid
                container
                direction='column'
                justify='space-between'
                alignItems='stretch'
                style={{ height: topheight }}
              >
                <Grid item>
                  <DataBox label='X' value='500'></DataBox>
                </Grid>
                <Grid item>
                  <DataBox label='Y' value='500'></DataBox>
                </Grid>
                <Grid item>
                  <DataBox label='R' value='500'></DataBox>
                </Grid>
                <Grid item>
                  <DataBox label='A' value='500'></DataBox>
                </Grid>
                <Grid item>
                  <DataBox label='C' value='500'></DataBox>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid
                container
                direction='column'
                justify='space-between'
                alignItems='stretch'
                style={{ height: topheight }}
              >
                <GCodeBox />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashbaord;
