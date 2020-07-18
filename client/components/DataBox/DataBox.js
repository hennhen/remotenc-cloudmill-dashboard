import React from 'react';
import { Grid, Card, Typography, CardContent } from '@material-ui/core';
import PropTypes from 'prop-types';

const DataBox = ({ label, value }) => {
  return (
    <Card raised>
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant='h6'>{`${label}:`}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Grid container justify='flex-end'>
              <Typography variant='h6'>{value}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

DataBox.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string
};

export default DataBox;
