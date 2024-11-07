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
  keyReloadMedicineByDate: number;
  setKeyReloadMedicineByDate: React.Dispatch<React.SetStateAction<number>>;
  keyReloadMedicineTop10: number;
  setKeyReloadMedicineTop10: React.Dispatch<React.SetStateAction<number>>;
  keyReloadPatientByDate: number;
  setKeyReloadPatientByDate: React.Dispatch<React.SetStateAction<number>>;
  idPatientPathname: string;
  setIDPatientPathname: React.Dispatch<React.SetStateAction<string>>;
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
  keyReloadMedicineByDate: 1,
  setKeyReloadMedicineByDate: () => {},
  keyReloadMedicineTop10: 1,
  setKeyReloadMedicineTop10: () => {},
  keyReloadPatientByDate: 1,
  setKeyReloadPatientByDate: () => {},
  idPatientPathname: "",
  setIDPatientPathname: () => {},
};

export const ClinicContext = createContext<ClinicContextType>(defaultValue);
function ContextClinic({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [dataUser, setDataUser] = useState<boolean>(false);
  const [keyReloadPatient, setKeyReloadPatient] = useState<number>(1);
  const [keyReloadMedication, setKeyReloadMedication] = useState<number>(1);
  const [keyReloadPrescription, setKeyReloadPrescription] = useState<number>(1);
  const [keyReloadMedicineByDate, setKeyReloadMedicineByDate] =
    useState<number>(1);
  const [keyReloadMedicineTop10, setKeyReloadMedicineTop10] =
    useState<number>(1);
  const [keyReloadPatientByDate, setKeyReloadPatientByDate] =
    useState<number>(1);

  const [idPatientPathname, setIDPatientPathname] = useState<string>("");
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
    keyReloadMedicineByDate,
    setKeyReloadMedicineByDate,
    keyReloadMedicineTop10,
    setKeyReloadMedicineTop10,
    keyReloadPatientByDate,
    setKeyReloadPatientByDate,

    idPatientPathname,
    setIDPatientPathname,
  };
  return (
    <ClinicContext.Provider value={contextValue}>
      {children}
    </ClinicContext.Provider>
  );
}

export default ContextClinic;
