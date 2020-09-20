import React, { useState } from 'react';
import { Slider, Typography, Grid } from '@material-ui/core';
import { SettingBox } from './SettingBox';

type SliderBoxProps = {
  name: string;
  actual: number;
  max: number;
};

const height = 150;

const SliderBox = ({ name, actual, max }: SliderBoxProps) => {
  const [value, setValue] = useState(50);

  return (
    <SettingBox name={name} slider>
      <Grid container>
        <Grid item xs={10}>
          <Grid
            container
            direction='column'
            justify='space-evenly'
            alignItems='flex-start'
            style={{ height: height }}
          >
            <Typography>
              Theoretical: {Math.round((max * value) / 100)}
            </Typography>
            <Typography>Actual: {actual}</Typography>
          </Grid>
        </Grid>

        <Grid item xs={2} style={{ height: height }}>
          <Slider
            value={value}
            onChange={(event, newValue: number | number[]) => {
              setValue(newValue as number);
            }}
            orientation='vertical'
            aria-labelledby='vertical-slider'
          />
        </Grid>
      </Grid>
    </SettingBox>
  );
};

export { SliderBox };
