import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import {
   Container,
   Grid,
   Divider,
   Button,
   Typography,
   Switch,
} from "@material-ui/core";
import {
   SideBar,
   Video,
   DataBox,
   GCodeBox,
   SettingBox,
   SliderBox,
} from "../components";
import { useWebRTC } from "../hooks";
import { withStyles } from "@material-ui/core/styles";
import { green, red, yellow } from "@material-ui/core/colors";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { JobContext } from "../context";

const topHeight = 420;
const bottomHeight = 270;

const GreenButton = withStyles((theme) => ({
   root: {
      color: theme.palette.getContrastText(green[700]),
      backgroundColor: green[700],
      "&:hover": {
         backgroundColor: green[900],
      },
   },
}))(Button);

const RedButton = withStyles((theme) => ({
   root: {
      color: theme.palette.getContrastText(red[700]),
      backgroundColor: red[700],
      "&:hover": {
         backgroundColor: red[900],
      },
   },
}))(Button);

const YellowButton = withStyles((theme) => ({
   root: {
      color: theme.palette.getContrastText(yellow[700]),
      backgroundColor: yellow[700],
      "&:hover": {
         backgroundColor: yellow[800],
      },
   },
}))(Button);

const Dashboard = () => {
   const { job, setJob } = useContext(JobContext);
   const history = useHistory();

   const { videoOne, videoTwo, data, connected } = useWebRTC(
      (job && job.machine.ip_address) || "none"
   );

   const dashboardNode = job ? (
      <Container>
         <Grid container spacing={3}>
            <Grid item xs={2}>
               <div style={{ padding: "10px 0" }}>
                  <ArrowBackIcon
                     fontSize="large"
                     color="primary"
                     style={{ cursor: "pointer" }}
                     onClick={() => {
                        setJob(undefined);
                        history.push("/jobs");
                     }}
                  />
               </div>
               <SideBar name={job.name} />
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={9}>
               <Grid container spacing={3}>
                  <Grid item xs={4}>
                     <Grid
                        container
                        direction="column"
                        justify="space-between"
                        alignItems="flex-start"
                        style={{ height: topHeight }}
                     >
                        <Grid item>
                           {connected && <Video ref={videoOne} />}
                        </Grid>
                        <Grid item>
                           {connected && <Video ref={videoTwo} />}
                        </Grid>
                     </Grid>
                  </Grid>
                  <Grid item xs={4}>
                     <Grid
                        container
                        direction="column"
                        justify="space-between"
                        alignItems="stretch"
                        style={{ height: topHeight }}
                     >
                        <Grid item>
                           <DataBox label="X" value={data.coors.x}></DataBox>
                        </Grid>
                        <Grid item>
                           <DataBox label="Y" value={data.coors.y}></DataBox>
                        </Grid>
                        <Grid item>
                           <DataBox label="Z" value={data.coors.z}></DataBox>
                        </Grid>
                        <Grid item>
                           <DataBox label="A" value={data.coors.a}></DataBox>
                        </Grid>
                        <Grid item>
                           <DataBox label="C" value={data.coors.c}></DataBox>
                        </Grid>
                     </Grid>
                  </Grid>
                  <Grid item xs={4}>
                     <Grid
                        container
                        direction="column"
                        justify="space-between"
                        alignItems="stretch"
                        style={{ height: topHeight }}
                     >
                        <GCodeBox
                           gCode={job.gcode_array}
                           currentIdx={data.line_num}
                        />
                     </Grid>
                  </Grid>
               </Grid>
               <Grid container spacing={3} style={{ height: bottomHeight }}>
                  <Grid item xs={3}>
                     <Grid container direction="column" spacing={2}>
                        <Grid item>
                           <GreenButton
                              color="primary"
                              variant="contained"
                              fullWidth
                           >
                              Start
                           </GreenButton>
                        </Grid>
                        <Grid item>
                           <RedButton
                              color="primary"
                              variant="contained"
                              fullWidth
                           >
                              Stop
                           </RedButton>
                        </Grid>
                        <Grid item>
                           <YellowButton
                              color="primary"
                              variant="contained"
                              fullWidth
                           >
                              Pause
                           </YellowButton>
                        </Grid>
                     </Grid>
                  </Grid>
                  <Grid item xs={3}>
                     <Grid
                        container
                        direction="column"
                        justify="space-between"
                        alignItems="stretch"
                     >
                        <Grid item>
                           <SettingBox name="Tool">
                              <Grid container>
                                 <Grid item xs={6}>
                                    <Typography variant="h6">
                                       Tool Dia:{" "}
                                    </Typography>
                                 </Grid>
                                 <Grid item xs={6}>
                                    <Typography
                                       variant="h6"
                                       style={{ fontWeight: 400 }}
                                    >
                                       {'1/2"'}
                                    </Typography>
                                 </Grid>
                              </Grid>
                           </SettingBox>
                        </Grid>
                        <Grid item>
                           <SettingBox name="Coolant">
                              <Grid container justify="flex-end">
                                 <Switch color="primary" />
                              </Grid>
                           </SettingBox>
                        </Grid>
                     </Grid>
                  </Grid>
                  <Grid item xs={3}>
                     <SliderBox name="Spindle" actual={1495} max={3000} />
                  </Grid>
                  <Grid item xs={3}>
                     <SliderBox name="Feed Rate" actual={48} max={100} />
                  </Grid>
               </Grid>
            </Grid>
         </Grid>
      </Container>
   ) : null;

   return dashboardNode;
};

export { Dashboard };
