import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks';
import {
  Typography,
  Button,
  Grid,
  Container,
  Divider
} from '@material-ui/core';

type HeaderProps = {
  company: string;
};

const Header = ({ company }: HeaderProps) => {
  const { setAuth } = useAuth();
  const history = useHistory();

  return (
    <Container>
      <Grid
        container
        style={{
          marginBottom: 12,
          padding: 12
        }}
      >
        <Grid item xs={4}>
          <Typography variant='h5'>RemoteNC Cloud Mill</Typography>
        </Grid>
        <Grid item xs={4}>
          <Grid container justify='center'>
            <Typography variant='h5' style={{ fontWeight: 500 }}>
              {company}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container justify='flex-end'>
            <Button
              color='primary'
              variant='contained'
              onClick={async () => {
                await setAuth();
                history.push('/');
              }}
            >
              DISCONNECT
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
    </Container>
  );
};

export { Header };
