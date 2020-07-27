import React from 'react';
import config from 'config';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { rem } from 'polished';

const useStyles = makeStyles({
  root: {
    transition: 'margin 1s linear',
    marginTop: ({ offset }) => rem(`${offset}px`)
  }
});

// Placeholder
const GCodeBox = ({ gcode }) => {
  const classes = useStyles({
    offset: config.dashboardTopHeight - gcode.length * 32
  });

  return (
    <Card
      style={{
        backgroundColor: '#000000',
        height: '100%'
      }}
    >
      <CardContent>
        <div className={classes.root}>
          {gcode.map((gCodeLine, idx) => (
            <Typography variant='h5' style={{ color: '#ffffff' }} key={idx}>
              {gCodeLine}
            </Typography>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

GCodeBox.propTypes = {
  gcode: PropTypes.array
};

export default GCodeBox;
