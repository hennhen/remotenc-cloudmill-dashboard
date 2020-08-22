import React, { useState } from 'react';
import { useAuth } from '../hooks';
import { Button } from '@material-ui/core';
import { Form } from '../components';

const Auth = () => {
  const [type, setType] = useState('Login');

  const { login, register } = useAuth();

  const submit = ({ company, email, password }) => {
    if (type === 'Login') login(email, password);
    else register(company, email, password);
  };

  const fields = [];

  if (type === 'Register')
    fields.push({
      required: true,
      id: 'standard-required',
      label: 'Company',
      value: 'company'
    });

  fields.push({
    required: true,
    id: 'standard-required',
    label: 'Email',
    value: 'email'
  });
  fields.push({
    required: true,
    id: 'standard-password-input',
    label: 'Password',
    type: 'password',
    autoComplete: 'current-password',
    value: 'password'
  });

  return (
    <>
      <Form submit={submit} title={type} fields={fields}>
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
      </Form>
    </>
  );
};

export default Auth;
