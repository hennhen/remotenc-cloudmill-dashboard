import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Typography, Box } from '@material-ui/core';
import { rem } from 'polished';

const CircularProgressWithLabel = (props) => {
  return (
    <Box position='relative' display='inline-flex'>
      <CircularProgress variant='static' {...props} size={`${rem('150px')}`} />
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

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and static variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired
};

export default CircularProgressWithLabel;
