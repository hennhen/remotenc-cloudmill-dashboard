import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Card,
  CardContent,
  Grid,
  Button
} from '@material-ui/core';

export type Field = {
  label: string;
  value: string;
  id?: string;
  required?: boolean;
  autoComplete?: string;
  type?: string;
};

type FormProps = {
  submit: (inputs: { [key: string]: string }) => void;
  title: string;
  fields: Field[];
  modal?: boolean;
  children?: React.ReactNode | React.ReactNode[];
};

const Form = ({ submit, title, fields, modal, children }: FormProps) => {
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: Field
  ) => {
    const {
      target: { value: newValue }
    } = event;
    setInputs((prevInputs) => {
      const newInputs = { ...prevInputs };
      newInputs[field.value] = newValue;
      return newInputs;
    });
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    idx: number
  ) => {
    if (event.keyCode === 13) {
      if (idx === fields.length - 1) submit(inputs);
    }
  };

  const fieldsNode = fields.map((field, idx) => (
    <React.Fragment key={idx}>
      <TextField
        {...field}
        value={inputs[field.value] || ''}
        onChange={(event) => handleChange(event, field)}
        onKeyDown={(event) => handleKeyDown(event, idx)}
      ></TextField>
      <br />
      <br />
    </React.Fragment>
  ));

  const cardNode = (
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
  );

  const contentNode = modal ? (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300
      }}
    >
      {cardNode}
    </div>
  ) : (
    <Grid
      container
      justify='center'
      alignItems='center'
      style={{ height: '90vh' }}
    >
      <Grid item style={{ width: 300 }}>
        {cardNode}
      </Grid>
    </Grid>
  );

  return contentNode;
};

export { Form };
