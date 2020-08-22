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

const Jobs = () => {
  const { user } = useContext(UserContext);

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
      <Button
        variant='contained'
        color='primary'
        onClick={() => {}}
        style={{ marginTop: 12 }}
      >
        Create a new job
      </Button>
    </Container>
  );
};

export default Jobs;
