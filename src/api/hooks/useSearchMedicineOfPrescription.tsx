import useSWR from "swr";
import { MedicationData } from "../../types";

interface Props {
  keyword: string;
}
function useSearchMedicineOfPrescription({ keyword }: Props) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const shouldFetch = keyword
    ? `${apiUrl}/Medicine/Details/Keyword=${keyword}`
    : null;
  const { data, isLoading, mutate } = useSWR<MedicationData>(shouldFetch);

  return { data, isLoading, mutate };
}

export default useSearchMedicineOfPrescription;
