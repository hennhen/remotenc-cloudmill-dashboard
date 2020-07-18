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
import styled from 'styled-components';
import { rem } from 'polished';

const StyledCard = styled(Card)`
  margin-bottom: ${rem('32px')};
`;

const StyledGrid = styled(Grid)`
  width: fit-content;
  & h3 {
    margin: ${rem('12px')};
  }
  & h5 {
    margin: ${rem('24px')};
  }

  cursor: pointer;
`;

const MachineBox = ({ history, number, clientName, jobName }) => {
  const [open, setOpen] = useState(false);

  return (
    <StyledCard raised>
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
            <Button
              color='primary'
              variant='contained'
              style={{ marginLeft: rem('12px') }}
              onClick={() => {
                history.push('/dashboard');
              }}
            >
              CONNECT
            </Button>
          </Grid>
        </CardActions>
      )}
    </StyledCard>
  );
};

MachineBox.propTypes = {
  history: PropTypes.object,
  number: PropTypes.number,
  clientName: PropTypes.string,
  jobName: PropTypes.string
};

export default withRouter(MachineBox);
