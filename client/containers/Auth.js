import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
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
  const history = useHistory();

  const connect = async () => {
    const response = await axios.post('/api/auth', {
      email: email,
      password: password
    });
    console.log(response);
    if (response.status !== 200) return;
    history.push('/dashboard');
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
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <div style={{ marginTop: 12 }}>
              <Button variant='contained' color='primary' onClick={connect}>
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
