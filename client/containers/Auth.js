import React, { useState } from 'react';
import { useAuth } from '../hooks';
import {
  Typography,
  TextField,
  Card,
  CardContent,
  Grid,
  Button
} from '@material-ui/core';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const submit = () => {
    login(email, password);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      submit();
    }
  };

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
            <TextField
              required
              id='standard-required'
              label='Email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              id='standard-password-input'
              label='Password'
              type='password'
              autoComplete='current-password'
              onKeyDown={handleKeyDown}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <div style={{ marginTop: 12 }}>
              <Button variant='contained' color='primary' onClick={submit}>
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
