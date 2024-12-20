import useSWR from "swr";
import { MedicationData } from "../../types";

interface Props {
  keyword: string;
  page: number;
  limit: number;
}
function useSearchMedicineOfPrescription({ keyword, limit, page }: Props) {
  const apiUrl = window.location.origin + "/api";
  const shouldFetch = keyword
    ? `${apiUrl}/Medicine/Details/Keyword=${keyword}?page=${page}&limit=${limit}`
    : null;
  const { data, isLoading, mutate } = useSWR<MedicationData>(shouldFetch);

  return { data, isLoading, mutate };
}

export default useSearchMedicineOfPrescription;
