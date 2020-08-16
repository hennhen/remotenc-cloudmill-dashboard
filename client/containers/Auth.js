import React, { useState, useContext } from 'react';
import { useAuth } from '../hooks';
import { AlertContext } from '../context';
import {
  Typography,
  TextField,
  Card,
  CardContent,
  Grid,
  Button,
  Snackbar
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const Auth = () => {
  const { alert, setAlert } = useContext(AlertContext);
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
        {alert && (
          <Snackbar
            open={true}
            autoHideDuration={5000}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
            onClose={() => {
              setAlert(null);
            }}
          >
            <Alert
              severity={alert.type}
              variant='filled'
              onClose={() => {
                setAlert(null);
              }}
            >
              {alert.message}
            </Alert>
          </Snackbar>
        )}
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
            <br />
            <br />
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
