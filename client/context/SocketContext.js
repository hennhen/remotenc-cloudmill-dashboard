import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const SocketContext = React.createContext({
  socket: null,
  setSocket: () => {}
});

const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  return (
    <SocketContext.Provider value={{ socket: socket, setSocket: setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

SocketContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default SocketContextProvider;
