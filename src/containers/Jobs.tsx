import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
import { UserContext, JobContext } from '../context';
import axios from 'axios';
import { Form, Field } from '../components';

const Jobs = () => {
  const [modal, setModal] = useState<React.ReactNode>(null);
  const { user, setUser } = useContext(UserContext);
  const { setJob } = useContext(JobContext);
  const history = useHistory();

  const submit = async ({ name }: { [key: string]: string }) => {
    try {
      const response = await axios.post('/job', { name });
      setUser(response.data);
      setModal(null);
    } catch (err) {
      console.error(err);
    }
  };

  const fields: Field[] = [
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
    user && user.jobs.length !== 0 ? (
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
              <TableCell>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => {
                    // TODO: Determine if Job is ready to be viewed
                    setJob({
                      ...job,
                      gCode: [
                        'temp GCODE',
                        'temp GCODE',
                        'temp GCODE',
                        'temp GCODE',
                        'temp GCODE',
                        'temp GCODE',
                        'temp GCODE',
                        'temp GCODE',
                        'temp GCODE',
                        'temp GCODE'
                      ]
                    });
                    history.push('/dashboard');
                  }}
                >
                  View Job
                </Button>
              </TableCell>
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

export { Jobs };
