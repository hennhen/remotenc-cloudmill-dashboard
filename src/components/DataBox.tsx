import React from 'react';
import { Grid, Card, Typography, CardContent } from '@material-ui/core';

type DataBoxProps = {
  label: string;
  value: number;
};

const DataBox = ({ label, value }: DataBoxProps) => {
  return (
    <Card raised>
      <CardContent style={{ paddingBottom: 16 }}>
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

export { DataBox };
