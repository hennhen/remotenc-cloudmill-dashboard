import React, { useState } from 'react';

export type Alert = {
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
};

type AlertContextProps = {
  alert?: Alert;
  setAlert: (alert: Alert | undefined) => void;
};

export const AlertContext = React.createContext<AlertContextProps>({
  alert: undefined,
  setAlert: (alert) => {}
});

const AlertContextProvider = ({
  children
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [alert, setAlert] = useState<Alert | undefined>(undefined);

  return (
    <AlertContext.Provider value={{ alert: alert, setAlert: setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export { AlertContextProvider };
