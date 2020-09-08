import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { client } from 'config';
import {
  Container,
  Grid,
  Divider,
  Button,
  Typography,
  Switch
} from '@material-ui/core';
import {
  SideBar,
  Video,
  DataBox,
  GCodeBox,
  SettingBox,
  SliderBox
} from '../components';
import { useWebRTC } from '../hooks';
import { rem } from 'polished';
import { withStyles } from '@material-ui/core/styles';
import { green, red, yellow } from '@material-ui/core/colors';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { SocketContext, JobContext } from '../context';

const topHeight = rem(`${client.topHeight}px`);
const bottomHeight = rem(`${client.bottomHeight}px`);

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

const Dashboard = () => {
  const { socket } = useContext(SocketContext);
  const { job, setJob } = useContext(JobContext);
  // const [data, setData] = useState({ x: 0, y: 0, z: 0, a: 0, c: 0 });
  const [gCodeIdx, setGCodeIdx] = useState(-1);
  const history = useHistory();

  const { videoOne, videoTwo, data, connected } = useWebRTC();

  useEffect(() => {
    socket.on('gcode', (idx) => {
      setGCodeIdx(idx);
    });

    return () => {
      socket.off('gcode');
    };
  }, []);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <div style={{ padding: `${rem('10px')} 0` }}>
            <ArrowBackIcon
              fontSize='large'
              color='primary'
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setJob({});
                history.push('/jobs');
              }}
            />
          </div>
          <SideBar name={job.name} />
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
                style={{ height: topHeight }}
              >
                <Grid item>{connected && <Video ref={videoOne} />}</Grid>
                <Grid item>{connected && <Video ref={videoTwo} />}</Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid
                container
                direction='column'
                justify='space-between'
                alignItems='stretch'
                style={{ height: topHeight }}
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
                style={{ height: topHeight }}
              >
                <GCodeBox gCode={job.gCode} currentIdx={gCodeIdx} />
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={3} style={{ height: bottomHeight }}>
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

export default Dashboard;
