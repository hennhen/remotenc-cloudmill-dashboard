import { useContext } from 'react';
import { UserContext, AlertContext } from '../context';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const useAuth = () => {
  const { setUser } = useContext(UserContext);
  const { setAlert } = useContext(AlertContext);
  const history = useHistory();

  const storeToken = (token: string) => {
    axios.defaults.headers.common['Authorization'] = `token ${token}`;
    localStorage.setItem('token', token);
  };

  const fetchJobs = async () => {
    const { data: jobs } = await axios.get('/user/job');
    return jobs;
  };

  const setAuth = async (token?: string) => {
    if (token) {
      storeToken(token);
      try {
        const user = await axios.get('/auth/user');
        const { company_name: company } = user.data;
        const jobs = await fetchJobs();
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
      const response = await axios.post('/auth/login', {
        email: email,
        password: password
      });
      const {
        token,
        user: { company_name: company }
      } = response.data;
      storeToken(token);
      const jobs = await fetchJobs();
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
      const response = await axios.post('/auth/register', {
        email,
        password1: password,
        password2: password,
        company_name: company
      });
      await setAuth(response.data.token);
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
