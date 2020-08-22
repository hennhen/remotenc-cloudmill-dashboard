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
  const [company, setCompany] = useState('');
  const [type, setType] = useState('Login');

  const { login, register } = useAuth();

  const submit = () => {
    if (type === 'Login') login(email, password);
    else register(company, email, password);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      submit();
    }
  };

  const registerNode = (
    <>
      <TextField
        required
        id='standard-required'
        label='Company'
        value={company}
        onChange={(event) => setCompany(event.target.value)}
      />
      <br />
      <br />
    </>
  );

  return (
    <Grid
      container
      justify='center'
      alignItems='center'
      style={{ height: '90vh' }}
    >
      <Grid item style={{ width: 300 }}>
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
              {type}
            </Typography>
            {type === 'Register' ? registerNode : null}
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
            <div style={{ marginTop: 12 }}>
              <Button
                variant='contained'
                color='primary'
                onClick={() =>
                  setType((prevType) =>
                    prevType === 'Login' ? 'Register' : 'Login'
                  )
                }
              >
                Switch to {type === 'Login' ? 'register' : 'login'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Auth;
