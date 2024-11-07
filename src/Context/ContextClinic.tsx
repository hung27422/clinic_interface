import React, { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface ClinicContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  dataUser: boolean;
  setDataUser: React.Dispatch<React.SetStateAction<boolean>>;
  keyReloadPatient: number;
  setKeyReloadPatient: React.Dispatch<React.SetStateAction<number>>;
  keyReloadMedication: number;
  setKeyReloadMedication: React.Dispatch<React.SetStateAction<number>>;
  keyReloadPrescription: number;
  setKeyReloadPrescription: React.Dispatch<React.SetStateAction<number>>;
}
const defaultValue: ClinicContextType = {
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  dataUser: false,
  setDataUser: () => {},
  keyReloadPatient: 1,
  setKeyReloadPatient: () => {},
  keyReloadMedication: 1,
  setKeyReloadMedication: () => {},
  keyReloadPrescription: 1,
  setKeyReloadPrescription: () => {},
};

export const ClinicContext = createContext<ClinicContextType>(defaultValue);
function ContextClinic({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [dataUser, setDataUser] = useState<boolean>(false);
  const [keyReloadPatient, setKeyReloadPatient] = useState<number>(1);
  const [keyReloadMedication, setKeyReloadMedication] = useState<number>(1);
  const [keyReloadPrescription, setKeyReloadPrescription] = useState<number>(1);
  const contextValue = {
    isAuthenticated,
    setIsAuthenticated,
    dataUser,
    setDataUser,
    keyReloadPatient,
    setKeyReloadPatient,
    keyReloadMedication,
    setKeyReloadMedication,
    keyReloadPrescription,
    setKeyReloadPrescription,
  };
  return (
    <ClinicContext.Provider value={contextValue}>
      {children}
    </ClinicContext.Provider>
  );
}

export default ContextClinic;
