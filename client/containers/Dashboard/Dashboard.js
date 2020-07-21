import React, { useContext, useState, useEffect, useRef } from 'react';
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
  Video,
  DataBox,
  GCodeBox,
  SettingBox,
  SliderBox
} from '../../components';
import { rem } from 'polished';
import { withStyles } from '@material-ui/core/styles';
import { green, red, yellow } from '@material-ui/core/colors';
import { SocketContext } from '../../context';
import PropTypes from 'prop-types';

const topheight = rem('420px');
const bottomheight = rem('270px');

const GreenButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(green[700]),
    backgroundColor: green[700],
    '&:hover': {
      backgroundColor: green[900]
    }
  }
}))(Button);

const RedButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[700]),
    backgroundColor: red[700],
    '&:hover': {
      backgroundColor: red[900]
    }
  }
}))(Button);

const YellowButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(yellow[700]),
    backgroundColor: yellow[700],
    '&:hover': {
      backgroundColor: yellow[800]
    }
  }
}))(Button);

const Dashboard = ({ history }) => {
  const { socket } = useContext(SocketContext);
  const [data, setData] = useState({ x: 0, y: 0, z: 0, a: 0, c: 0 });
  const [stream, setStream] = useState();

  const videoOne = useRef();
  const videoTwo = useRef();

  useEffect(() => {
    if (!socket) return history.push('/');
    socket.on('udpData', (data) => {
      const { coors } = JSON.parse(data);
      setData({ ...coors, a: 0, c: 0 });
    });

    const connectVideo = async () => {
      const webcamStream = await navigator.mediaDevices.getUserMedia({
        video: true
      });

      setStream(webcamStream);
      if (videoOne.current && videoTwo.current) {
        videoOne.current.srcObject = webcamStream;
        videoTwo.current.srcObject = webcamStream;
      }
    };

    connectVideo();
  }, []);

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
                alignItems='flex-start'
                style={{ height: topheight }}
              >
                <Grid item>{stream && <Video ref={videoOne} />}</Grid>
                <Grid item>{stream && <Video ref={videoTwo} />}</Grid>
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
                  <DataBox label='X' value={data.x}></DataBox>
                </Grid>
                <Grid item>
                  <DataBox label='Y' value={data.y}></DataBox>
                </Grid>
                <Grid item>
                  <DataBox label='Z' value={data.z}></DataBox>
                </Grid>
                <Grid item>
                  <DataBox label='A' value={data.a}></DataBox>
                </Grid>
                <Grid item>
                  <DataBox label='C' value={data.c}></DataBox>
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
                  <GreenButton color='primary' variant='contained' fullWidth>
                    Start
                  </GreenButton>
                </Grid>
                <Grid item>
                  <RedButton color='primary' variant='contained' fullWidth>
                    Stop
                  </RedButton>
                </Grid>
                <Grid item>
                  <YellowButton color='primary' variant='contained' fullWidth>
                    Pause
                  </YellowButton>
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
                      <Switch color='primary' />
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

Dashboard.propTypes = {
  history: PropTypes.object
};

export default Dashboard;
