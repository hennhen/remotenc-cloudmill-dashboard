import React from 'react';
import {
  Typography,
  TextField,
  Card,
  CardContent,
  Grid,
  Button
} from '@material-ui/core';

const Auth = () => {
  return (
    <Grid
      container
      justify='center'
      alignItems='center'
      style={{ height: '90vh' }}
    >
      <Grid item xs={2}>
        <Card>
          <CardContent>
            <Typography variant='h5' gutterBottom>
              Log in
            </Typography>
            <TextField required id='standard-required' label='Email' />
            <TextField
              id='standard-password-input'
              label='Password'
              type='password'
              autoComplete='current-password'
            />
            <div style={{ marginTop: 12 }}>
              <Button variant='contained' color='primary'>
                Submit
              </Button>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Auth;
