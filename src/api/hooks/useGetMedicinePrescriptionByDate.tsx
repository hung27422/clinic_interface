import useSWR from "swr";
import { MedicationData } from "../../types";

interface Props {
  startDate: string;
  endDate: string;
  page: number;
  limit: number;
}

function useGetMedicinePrescriptionByDate({
  startDate,
  endDate,
  page,
  limit,
}: Props) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { data, isLoading, mutate } = useSWR<MedicationData>(
    `${apiUrl}/Medicine/Prescription/Range/Start=${startDate}&End=${endDate}?page=${page}&limit=${limit}`
  );

  return { data, isLoading, mutate };
}

export default useGetMedicinePrescriptionByDate;
