import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Divider,
  Button,
  TextField,
  Grid
} from '@material-ui/core';
import { rem } from 'polished';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const GreenButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700]
    }
  }
}))(Button);

const StyledGrid = withStyles(() => ({
  root: {
    '& h3': {
      margin: rem('12px')
    },
    '& h5': {
      margin: rem('24px')
    },
    cursor: 'pointer'
  }
}))(Grid);

const MachineBox = ({ history, number, clientName, jobName }) => {
  const [open, setOpen] = useState(false);

  return (
    <Card raised style={{ margin: rem('32px') }}>
      <CardContent>
        <StyledGrid
          container
          alignItems='center'
          onClick={() => {
            setOpen((previous) => !previous);
          }}
        >
          <Typography variant='h5'>{`Machine #${number}`}</Typography>
          <Divider orientation='vertical' flexItem />
          <div>
            <Typography variant='h3'>{clientName}</Typography>
            <Typography variant='h5' component='h3'>
              {jobName}
            </Typography>
          </div>
        </StyledGrid>
      </CardContent>
      {open && (
        <CardActions>
          <Grid container justify='center'>
            <TextField
              id='filled-password-input'
              label='Password'
              type='password'
              autoComplete='current-password'
              variant='filled'
            />
            <GreenButton
              color='primary'
              variant='contained'
              style={{ marginLeft: rem('12px') }}
              onClick={() => {
                history.push('/dashboard');
              }}
            >
              CONNECT
            </GreenButton>
          </Grid>
        </CardActions>
      )}
    </Card>
  );
};

MachineBox.propTypes = {
  history: PropTypes.object,
  number: PropTypes.number,
  clientName: PropTypes.string,
  jobName: PropTypes.string
};

export default withRouter(MachineBox);
