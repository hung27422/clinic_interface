import { useContext } from "react";
import { ClinicContext } from "../../Context/ContextClinic";
import useSWR from "swr";
import { PatientData } from "../../types";

interface Props {
  page: number;
  limit: number;
}
function useGetPatientNotExamined({ page, limit }: Props) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { keyReloadPatient } = useContext(ClinicContext);
  const { data, isLoading, mutate } = useSWR<PatientData>(
    `${apiUrl}/Patient/Status/not_examined?page=${page}&limit=${limit}&reload=${keyReloadPatient}`
  );
  return { data, isLoading, mutate };
}

export default useGetPatientNotExamined;
