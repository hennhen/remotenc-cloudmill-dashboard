import React, { useContext, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Modal
} from '@material-ui/core';
import { UserContext } from '../context';
import axios from 'axios';
import { Form } from '../components';

const Jobs = () => {
  const [modal, setModal] = useState(null);
  const { user, setUser } = useContext(UserContext);

  const submit = async ({ name }) => {
    try {
      const response = await axios.post('/job', { name });
      setUser(response.data);
      setModal(null);
    } catch (err) {
      console.error(err);
    }
  };

  const fields = [
    {
      required: true,
      id: 'standard-required',
      label: 'Name',
      value: 'name'
    },
    {
      label: 'G-Code',
      value: 'gCode'
    }
  ];

  const contentNode =
    user.jobs.length !== 0 ? (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.jobs.map((job, idx) => (
            <TableRow key={idx}>
              <TableCell>{job.name}</TableCell>
              <TableCell>Pending</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    ) : (
      'No jobs created yet.'
    );

  return (
    <Container>
      <Typography variant='h1'>Jobs</Typography>
      {contentNode}
      <div style={{ marginTop: 12 }}>
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            setModal(
              <Form
                fields={fields}
                title='Create a Job'
                submit={submit}
                modal
              />
            );
          }}
        >
          Create a new job
        </Button>
      </div>
      {
        <Modal
          open={Boolean(modal)}
          onClose={() => {
            setModal(false);
          }}
        >
          <span>{modal}</span>
        </Modal>
      }
    </Container>
  );
};

export default Jobs;
