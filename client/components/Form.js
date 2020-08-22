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

const Form = ({ submit, title, fields }) => {
  const [inputs, setInputs] = useState({});

  const handleChange = (event, field) => {
    setInputs((prevInputs) => {
      const newInputs = { ...prevInputs };
      newInputs[field.value] = event.target.value;
      return newInputs;
    });
  };

  const handleKeyDown = (event, idx) => {
    if (event.keyCode === 13) {
      if (idx === fields.length - 1) submit();
    }
  };

  const fieldsNode = fields.map((field, idx) => (
    <>
      <TextField
        {...field}
        value={inputs[field]}
        key={idx}
        onChange={(event) => handleChange(event, field)}
        onKeyDown={(event) => handleKeyDown(event, idx)}
      ></TextField>
      <br />
      <br />
    </>
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
                  submit(fields);
                }}
              >
                Submit
              </Button>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

Form.propTypes = {
  submit: PropTypes.func,
  title: PropTypes.string,
  fields: PropTypes.array
};

export default Form;
