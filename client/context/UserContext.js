import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const UserContext = React.createContext({
  email: null
});

const UserContextProvider = ({ children }) => {
  const [email, setEmail] = useState(null);

  return (
    <UserContext.Provider value={{ email: email, setEmail: setEmail }}>
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default UserContextProvider;
