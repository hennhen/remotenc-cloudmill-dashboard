import React from 'react';
import {
  Container,
  Grid,
  Divider,
  Button,
  Typography,
  Switch
} from '@material-ui/core';
import {
  Header,
  SideBar,
  Webcam,
  DataBox,
  GCodeBox,
  SettingBox,
  SliderBox
} from '../../components';
import { rem } from 'polished';

const topheight = rem('420px');
const bottomheight = rem('270px');

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
          <Grid container spacing={3} style={{ height: bottomheight }}>
            <Grid item xs={3}>
              <Grid container direction='column' spacing={2}>
                <Grid item>
                  <Button color='primary' variant='contained' fullWidth>
                    Start
                  </Button>
                </Grid>
                <Grid item>
                  <Button color='primary' variant='contained' fullWidth>
                    Stop
                  </Button>
                </Grid>
                <Grid item>
                  <Button color='primary' variant='contained' fullWidth>
                    Pause
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid
                container
                direction='column'
                justify='space-between'
                alignItems='stretch'
              >
                <Grid item>
                  <SettingBox name='Tool'>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography variant='h6'>Tool Dia: </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant='h6' style={{ fontWeight: 400 }}>
                          {'1/2"'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </SettingBox>
                </Grid>
                <Grid item>
                  <SettingBox name='Coolant'>
                    <Grid container justify='flex-end'>
                      <Switch />
                    </Grid>
                  </SettingBox>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <SliderBox name='Spindle' actual={1495} max={3000} />
            </Grid>
            <Grid item xs={3}>
              <SliderBox name='Feed Rate' actual={48} max={100} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashbaord;
