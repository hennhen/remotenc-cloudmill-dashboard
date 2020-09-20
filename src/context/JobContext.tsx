import React, { useState } from 'react';

export type Job = {
  name: string;
  gCode: string[];
  status: 'Pending' | 'Ready';
  material: string;
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
