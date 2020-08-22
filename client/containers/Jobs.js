import React, { useContext } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button
} from '@material-ui/core';
import { UserContext } from '../context';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks';

const Jobs = () => {
  const { user } = useContext(UserContext);
  const { setAuth } = useAuth();
  const history = useHistory();

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
        <Button variant='contained' color='primary' onClick={() => {}}>
          Create a new job
        </Button>
        <Button
          variant='contained'
          color='primary'
          style={{ float: 'right' }}
          onClick={async () => {
            await setAuth();
            history.push('/');
          }}
        >
          Logout
        </Button>
      </div>
    </Container>
  );
};

export default Jobs;
