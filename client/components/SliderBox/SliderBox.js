import React, { useState } from 'react';
import { Slider, Typography, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { SettingBox } from '../';
import { rem } from 'polished';

const height = rem('150px');

const SliderBox = ({ name, actual, max }) => {
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
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            orientation='vertical'
            aria-labelledby='vertical-slider'
          />
        </Grid>
      </Grid>
    </SettingBox>
  );
};

SliderBox.propTypes = {
  name: PropTypes.string,
  actual: PropTypes.number,
  max: PropTypes.number
};

export default SliderBox;
