import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const AlertContext = React.createContext({
  alert: {},
  setAlert: () => {}
});

const AlertContextProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  return (
    <AlertContext.Provider value={{ alert: alert, setAlert: setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

AlertContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AlertContextProvider;
