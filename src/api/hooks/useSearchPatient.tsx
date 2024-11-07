import useSWR from "swr";
import { PatientData } from "../../types";

interface Props {
  phone: string | null;
}

function useSearchPatient({ phone }: Props) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const shouldFetch = phone ? `${apiUrl}/Patient/Phone/${phone}` : null;
  const { data, isLoading, mutate } = useSWR<PatientData>(shouldFetch);
  return { data, isLoading, mutate };
}

export default useSearchPatient;
