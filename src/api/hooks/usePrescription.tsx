import useSWR from "swr";
import { PatientData } from "../../types";

interface Props {
  page: number;
  limit: number;
}

function usePrescription({ page, limit }: Props) {
  const apiUrl = window.location.origin + "/api";
  const { data, isLoading, mutate } = useSWR<PatientData>(
    `${apiUrl}/Prescription?page=${page}&limit=${limit}`
  );

  return { data, isLoading, mutate };
}

export default usePrescription;
