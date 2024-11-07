import useSWR from "swr";
import { MedicationData } from "../../types";
import { useContext } from "react";
import { ClinicContext } from "../../Context/ContextClinic";

interface Props {
  page: number;
  limit: number;
}
function useMedications({ page, limit }: Props) {
  const { keyReloadMedication } = useContext(ClinicContext);
  const apiUrl = import.meta.env.VITE_API_URL;
  const { data, isLoading, mutate } = useSWR<MedicationData>(
    `${apiUrl}` +
      `/Medicine?page=${page}&limit=${limit}&reload=${keyReloadMedication}`
  );

  return { data, isLoading, mutate };
}

export default useMedications;
