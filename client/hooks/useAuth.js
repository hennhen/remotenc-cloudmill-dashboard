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
        return true;
      } catch (err) {
        console.error(err);
      }
    }
    delete axios.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
    setEmail(null);
    return false;
  };

  const login = async (email, password) => {
    const response = await axios.post('/auth', {
      email: email,
      password: password
    });
    if (response.status !== 200) return false;
    await setAuth(response.data.token);
    history.push('/dashboard');
  };

  return { setAuth, login };
};

export default useAuth;
