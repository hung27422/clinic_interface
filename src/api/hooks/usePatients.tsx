import useSWR from "swr";
import { PatientData } from "../../types";
import { useContext } from "react";
import { ClinicContext } from "../../Context/ContextClinic";
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
};
interface Props {
  page: number;
  limit: number;
}

function usePatients({ page, limit }: Props) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { keyReloadPatient } = useContext(ClinicContext);
  const { data, isLoading, mutate } = useSWR<PatientData>(
    `${apiUrl}/Patient?page=${page}&limit=${limit}&reload=${keyReloadPatient}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return { data, isLoading, mutate };
}

export default usePatients;
