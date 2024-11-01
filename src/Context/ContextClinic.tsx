import React, { createContext, useState } from "react";
import { User } from "../types";

interface Props {
  children: React.ReactNode;
}

interface ClinicContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  dataUser: object;
  setDataUser: React.Dispatch<React.SetStateAction<User>>;
}
const defaultValue: ClinicContextType = {
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  dataUser: { id: "", token: "" },
  setDataUser: () => {},
};

export const ClinicContext = createContext<ClinicContextType>(defaultValue);
function ContextClinic({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [dataUser, setDataUser] = useState<object>({});
  const contextValue = {
    isAuthenticated,
    setIsAuthenticated,
    dataUser,
    setDataUser,
  };
  return (
    <ClinicContext.Provider value={contextValue}>
      {children}
    </ClinicContext.Provider>
  );
}

export default ContextClinic;
