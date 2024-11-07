import useSWR from "swr";
import { PatientDataTemp } from "../../types";

interface Props {
  startDate: string;
  endDate: string;
  page: number;
  limit: number;
}

function useGetPatientByDate({ startDate, endDate, page, limit }: Props) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { data, isLoading, mutate } = useSWR<PatientDataTemp>(
    `${apiUrl}/Patient/Date/Start=${startDate}&End=${endDate}?page=${page}&limit=${limit}`
  );

  return { data, isLoading, mutate };
}

export default useGetPatientByDate;
