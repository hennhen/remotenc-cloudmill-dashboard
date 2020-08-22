import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Card,
  CardContent,
  Grid,
  Button
} from '@material-ui/core';
import PropTypes from 'prop-types';

const Form = ({ submit, title, fields, children }) => {
  const [inputs, setInputs] = useState({});

  const handleChange = (event, field) => {
    const {
      target: { value: newValue }
    } = event;
    setInputs((prevInputs) => {
      const newInputs = { ...prevInputs };
      newInputs[field.value] = newValue;
      return newInputs;
    });
  };

  const handleKeyDown = (event, idx) => {
    if (event.keyCode === 13) {
      if (idx === fields.length - 1) submit(inputs);
    }
  };

  const fieldsNode = fields.map((field, idx) => (
    <React.Fragment key={idx}>
      <TextField
        {...field}
        value={inputs[field]}
        onChange={(event) => handleChange(event, field)}
        onKeyDown={(event) => handleKeyDown(event, idx)}
      ></TextField>
      <br />
      <br />
    </React.Fragment>
  ));

  return (
    <Grid
      container
      justify='center'
      alignItems='center'
      style={{ height: '90vh' }}
    >
      <Grid item style={{ width: 300 }}>
        <Card>
          <CardContent>
            <Typography variant='h5' gutterBottom>
              {title}
            </Typography>
            {fieldsNode}
            <div>
              <Button
                variant='contained'
                color='primary'
                onClick={() => {
                  submit(inputs);
                }}
              >
                Submit
              </Button>
            </div>
            {children}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

Form.propTypes = {
  submit: PropTypes.func,
  title: PropTypes.string,
  fields: PropTypes.array,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default Form;
