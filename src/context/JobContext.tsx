import React, { useState } from 'react';

export type Machine = {
  ip_address: string;
};

export type Job = {
  name: string;
  gcode_array: string[];
  status: 'Pending' | 'Started' | 'Complete';
  material: string;
  machine: Machine;
};

type JobContextProps = {
  job?: Job;
  setJob: (job: Job | undefined) => void;
};

export const JobContext = React.createContext<JobContextProps>({
  job: undefined,
  setJob: (job) => {}
});

const JobContextProvider = ({
  children
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [job, setJob] = useState<Job | undefined>(undefined);

  return (
    <JobContext.Provider value={{ job: job, setJob: setJob }}>
      {children}
    </JobContext.Provider>
  );
};

export { JobContextProvider };
