import useSWR from "swr";
import { PatientData } from "../../types";
import { useContext } from "react";
import { ClinicContext } from "../../Context/ContextClinic";
interface Props {
  page: number;
  limit: number;
}
function usePatients({ page, limit }: Props) {
  const apiUrl = window.location.origin + "/api";
  const { keyReloadPatient } = useContext(ClinicContext);
  const { data, isLoading, mutate } = useSWR<PatientData>(
    `${apiUrl}/Patient?page=${page}&limit=${limit}&reload=${keyReloadPatient}`
  );
  return { data, isLoading, mutate };
}

export default usePatients;
