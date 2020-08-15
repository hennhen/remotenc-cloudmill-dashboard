import { useContext } from 'react';
import { UserContext } from '../context';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const useAuth = () => {
  const { setEmail } = useContext(UserContext);
  const history = useHistory();

  const setAuth = async (token) => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      localStorage.setItem('token', token);
      try {
        const user = await axios.get('/auth');
        setEmail(user.data.email);
      } catch (err) {
        console.error(err);
      }
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
      localStorage.removeItem('token');
      setEmail(null);
    }
  };

  const login = async (email, password) => {
    const response = await axios.post('/auth', {
      email: email,
      password: password
    });
    if (response.status !== 200) return;
    await setAuth(response.data.token);
    history.push('/dashboard');
  };

  return { setAuth, login };
};

export default useAuth;
