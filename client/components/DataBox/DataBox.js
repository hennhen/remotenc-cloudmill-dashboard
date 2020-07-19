import React from 'react';
import { Grid, Card, Typography, CardContent } from '@material-ui/core';
import PropTypes from 'prop-types';
import { rem } from 'polished';

const DataBox = ({ label, value }) => {
  return (
    <Card raised>
      <CardContent style={{ paddingBottom: rem('16px') }}>
        <Grid container alignItems='flex-end'>
          <Grid item xs={4}>
            <Typography variant='h6'>{`${label}:`}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Grid container justify='center'>
              <Typography variant='h4'>{value.toFixed(3)}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container justify='flex-end'>
              <Typography variant='subtitle1'>mm</Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

DataBox.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number
};

export default DataBox;
