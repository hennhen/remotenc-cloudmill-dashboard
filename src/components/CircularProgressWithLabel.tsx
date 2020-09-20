import React from 'react';
import { CircularProgress, Typography, Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

type CircularProgressWithLabelProps = {
  value: number;
};

const GreenCircularProgress = withStyles(() => ({
  root: {
    color: green[500]
  }
}))(CircularProgress);

const CircularProgressWithLabel = (props: CircularProgressWithLabelProps) => {
  return (
    <Box position='relative' display='inline-flex'>
      <GreenCircularProgress variant='static' {...props} size={150} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position='absolute'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <Typography variant='h3' component='div'>{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
};

export { CircularProgressWithLabel };
