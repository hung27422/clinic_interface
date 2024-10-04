import useSWR from "swr";
import { PatientDataTemp } from "../../types";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
};

interface Props {
  startDate: string;
  endDate: string;
  page: number;
  limit: number;
}

function useGetPatientByDate({ startDate, endDate, page, limit }: Props) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { data, isLoading, mutate } = useSWR<PatientDataTemp>(
    `${apiUrl}/Patient/Date?dateStart=${startDate}&dateEnd=${endDate}&page=${page}&limit=${limit}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return { data, isLoading, mutate };
}

export default useGetPatientByDate;
