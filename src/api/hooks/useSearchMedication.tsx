import useSWR from "swr";
import { MedicationData } from "../../types";

interface Props {
  name: string;
  page: number;
  limit: number;
}
function useSearchMedication({ name, page, limit }: Props) {
  const apiUrl = window.location.origin + "/api";
  const shouldFetch = name
    ? `${apiUrl}/Medicine/Name/${name}?page=${page}&limit=${limit}`
    : null;
  const { data, isLoading, mutate } = useSWR<MedicationData>(shouldFetch);

  return { data, isLoading, mutate };
}

export default useSearchMedication;
