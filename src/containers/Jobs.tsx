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
import { UserContext, JobContext, AlertContext } from '../context';
import { post } from '../hooks';
import { Form, Field } from '../components';

const Jobs = () => {
  const [modal, setModal] = useState<React.ReactNode>(null);
  const { user, setUser } = useContext(UserContext);
  const { setJob } = useContext(JobContext);
  const { setAlert } = useContext(AlertContext);
  const history = useHistory();

  const submit = async ({ name, material }: { [key: string]: string }) => {
    if (!user) return;
    try {
      const data = await post('/user/job/', {
        name,
        material,
        cam_file: 'cam_file',
        gcode_file: 'gcode_file'
      });

      setUser({ ...user, jobs: [...user.jobs, data] });
      setModal(null);
    } catch (err) {
      setAlert({
        type: 'error',
        message: 'Your session has expired, please log in again.'
      });
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
      required: true,
      id: 'standard-required',
      label: 'Material',
      value: 'material'
    }
  ];

  const contentNode =
    user && user.jobs.length !== 0 ? (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Material</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.jobs.map((job, idx) => (
            <TableRow key={idx}>
              <TableCell>{job.name}</TableCell>
              <TableCell>{job.material}</TableCell>
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
                  disabled={job.status !== 'Ready'}
                >
                  {job.status}
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
