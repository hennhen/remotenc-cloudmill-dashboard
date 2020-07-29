import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const SettingBox = ({ children, name, slider }) => {
  return (
    <Card raised style={slider && { height: '100%' }}>
      <CardContent>
        <Typography variant='h6'>{name}</Typography>
        {children}
      </CardContent>
    </Card>
  );
};

SettingBox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  name: PropTypes.string,
  slider: PropTypes.bool
};

export default SettingBox;
