import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

type GCodeBoxProps = {
  gCode: string[];
  currentIdx: number;
};

const GCodeBox = ({ gCode, currentIdx }: GCodeBoxProps) => {
  return (
    <Card
      style={{
        backgroundColor: '#000000',
        height: '100%'
      }}
    >
      <CardContent style={{ position: 'relative', height: '100%' }}>
        {gCode.map((gCodeLine, idx) => (
          <Typography
            variant={'h5'}
            key={idx}
            style={{
              color: currentIdx === idx ? '#ffffff' : '#777777',
              margin: 0,
              position: 'absolute',
              top: `${(idx - currentIdx) * 20 + 50}%`,
              transform: 'translateY(-50%)',
              transition: 'top 0.5s cubic-bezier(.5,0,.5,1)'
            }}
          >
            {gCodeLine}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};

export { GCodeBox };
