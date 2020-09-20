import { useContext } from 'react';
import { UserContext, AlertContext } from '../context';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export const get = async (path: string) => {
  const response = await axios.get(path);

  const { status, data } = response.data;
  if (status !== 'success') throw new Error('Something went wrong.');

  return data;
};

export const post = async (path: string, content: any) => {
  const response = await axios.post(path, content);

  const { status, data } = response.data;
  if (status !== 'success') throw new Error('Something went wrong.');

  return data;
};

const useAuth = () => {
  const { setUser } = useContext(UserContext);
  const { setAlert } = useContext(AlertContext);
  const history = useHistory();

  const storeToken = (token: string) => {
    axios.defaults.headers.common['Authorization'] = `token ${token}`;
    localStorage.setItem('token', token);
  };

  const setAuth = async (token?: string) => {
    if (token) {
      storeToken(token);
      try {
        const data = await get('/auth/user');

        const { company_name: company } = data;

        const jobs = await get('/user/job');

        setUser({ company, jobs });

        return true;
      } catch (err) {
        setAlert({
          type: 'info',
          message: 'Your session has expired, please log in again.'
        });
      }
    }
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
    setUser(undefined);
    return false;
  };

  const login = async (email: string, password: string) => {
    try {
      const data = await post('/auth/login/', {
        email: email,
        password: password
      });

      const {
        token,
        user: { company_name: company }
      } = data;

      storeToken(token);

      const jobs = await get('/user/job');

      setUser({ company, jobs });

      history.push('/jobs');
    } catch (err) {
      setAlert({
        type: 'error',
        message: err.message
      });
    }
  };

  const register = async (company: string, email: string, password: string) => {
    try {
      const data = await post('/auth/register/', {
        email,
        password1: password,
        password2: password,
        company_name: company
      });

      await setAuth(data.token);
      history.push('/jobs');
    } catch (err) {
      setAlert({
        type: 'error',
        message: err.message
      });
    }
  };

  return { setAuth, login, register };
};

export { useAuth };
