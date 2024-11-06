import axios from "axios";
import useSWR from "swr";
import { MedicationData } from "../../types";
import { useContext } from "react";
import { ClinicContext } from "../../Context/ContextClinic";

interface Props {
  page: number;
  limit: number;
}
const fetcher = (url: string) => axios.get(url).then((res) => res.data);
function useMedications({ page, limit }: Props) {
  const { keyReloadMedication } = useContext(ClinicContext);
  const apiUrl = import.meta.env.VITE_API_URL;
  const { data, isLoading, mutate } = useSWR<MedicationData>(
    `${apiUrl}` +
      `/Medicine?page=${page}&limit=${limit}&reload=${keyReloadMedication}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return { data, isLoading, mutate };
}

export default useMedications;
