import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

type SettingBoxProps = {
  children: React.ReactNode | React.ReactNode[];
  name: string;
  slider?: boolean;
};

const SettingBox = ({ children, name, slider }: SettingBoxProps) => {
  return (
    <Card raised style={slider ? { height: '100%' } : {}}>
      <CardContent>
        <Typography variant='h6'>{name}</Typography>
        {children}
      </CardContent>
    </Card>
  );
};

export { SettingBox };
