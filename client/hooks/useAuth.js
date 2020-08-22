import { useContext } from 'react';
import { UserContext, AlertContext } from '../context';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const useAuth = () => {
  const { setUser } = useContext(UserContext);
  const { setAlert } = useContext(AlertContext);
  const history = useHistory();

  const setAuth = async (token) => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      localStorage.setItem('token', token);
      try {
        const user = await axios.get('/auth');
        setUser(user.data);
        return true;
      } catch (err) {
        console.log('err');
        setAlert({
          type: 'info',
          message: 'Your session has expired, please log in again.'
        });
      }
    }
    delete axios.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
    setUser(null);
    return false;
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('/auth', {
        email: email,
        password: password
      });
      await setAuth(response.data.token);
      history.push('/jobs');
    } catch (err) {
      setAlert({
        type: 'error',
        message: 'Wrong credentials, please try again.'
      });
    }
  };

  const register = async (company, email, password) => {
    try {
      const response = await axios.post('/users', {
        company: company,
        email: email,
        password: password
      });
      await setAuth(response.data.token);
      history.push('/jobs');
    } catch (err) {
      setAlert({
        type: 'error',
        message: 'Please fill in all fields.'
      });
    }
  };

  return { setAuth, login, register };
};

export default useAuth;
