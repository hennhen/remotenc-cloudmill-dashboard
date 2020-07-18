import React from 'react';
import { Typography, Container } from '@material-ui/core';
import { MachineBox } from '../../components';

const TEMP_DATA = [
  { number: 1, clientName: 'Henry Wu', jobName: 'Aluminum Clevis Mount' },
  { number: 2, clientName: 'Baltazar Ruiz', jobName: '6061 Bellcrank Shaft' },
  { number: 3, clientName: 'Alex Mei', jobName: '57839-78' }
];

const Auth = () => {
  return (
    <Container maxWidth='md'>
      <Typography variant='h5' gutterBottom>
        Please Select a Machine to Connect:
      </Typography>
      {TEMP_DATA.map(({ number, clientName, jobName }) => (
        <MachineBox
          number={number}
          clientName={clientName}
          jobName={jobName}
          key={number}
        />
      ))}
    </Container>
  );
};

export default Auth;
