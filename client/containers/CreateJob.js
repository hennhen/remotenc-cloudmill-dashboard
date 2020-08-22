import React, { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context';
import { Form } from '../components';
import { useHistory } from 'react-router-dom';

const CreateJob = () => {
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const submit = async ({ name }) => {
    try {
      const response = await axios.post('/job', { name });
      setUser(response.data);
      history.push('/jobs');
    } catch (err) {
      console.error(err);
    }
  };

  const fields = [
    {
      required: true,
      id: 'standard-required',
      label: 'Name',
      value: 'name'
    },
    {
      label: 'G-Code',
      value: 'gCode'
    }
  ];

  return <Form submit={submit} title='Create a Job' fields={fields} />;
};

export default CreateJob;
