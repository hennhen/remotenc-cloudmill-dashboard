import { useContext } from 'react';
import { UserContext, AlertContext } from '../context';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const useAuth = () => {
  const { setEmail } = useContext(UserContext);
  const { setAlert } = useContext(AlertContext);
  const history = useHistory();

  const setAuth = async (token) => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      localStorage.setItem('token', token);
      try {
        const user = await axios.get('/auth');
        setEmail(user.data.email);
        return true;
      } catch (err) {
        setAlert({
          type: 'info',
          message: 'Your session has expired, please log in again.'
        });
      }
    }
    delete axios.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
    setEmail(null);
    return false;
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('/auth', {
        email: email,
        password: password
      });
      await setAuth(response.data.token);
      history.push('/dashboard');
    } catch (err) {
      setAlert({
        type: 'error',
        message: 'Wrong credentials, please try again.'
      });
    }
  };

  return { setAuth, login };
};

export default useAuth;
