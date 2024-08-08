import React, { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface ClinicContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}
const defaultValue: ClinicContextType = {
  isAuthenticated: false,
  setIsAuthenticated: () => {},
};

export const ClinicContext = createContext<ClinicContextType>(defaultValue);
function ContextClinic({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  const contextValue = { isAuthenticated, setIsAuthenticated };
  return (
    <ClinicContext.Provider value={contextValue}>
      {children}
    </ClinicContext.Provider>
  );
}

export default ContextClinic;
