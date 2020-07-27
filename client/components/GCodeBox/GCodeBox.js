import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

// Placeholder
const GCodeBox = ({ gcode }) => {
  return (
    <Card
      style={{
        backgroundColor: '#000000',
        height: '100%'
      }}
    >
      <CardContent>
        <Typography variant='h5' style={{ color: '#ffffff' }}>
          {gcode}
        </Typography>
      </CardContent>
    </Card>
  );
};

GCodeBox.propTypes = {
  gcode: PropTypes.string
};

export default GCodeBox;
