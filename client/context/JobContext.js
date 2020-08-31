import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const JobContext = React.createContext({
  job: {},
  setJob: () => {}
});

const JobContextProvider = ({ children }) => {
  const [job, setJob] = useState({});

  return (
    <JobContext.Provider value={{ job: job, setJob: setJob }}>
      {children}
    </JobContext.Provider>
  );
};

JobContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default JobContextProvider;
