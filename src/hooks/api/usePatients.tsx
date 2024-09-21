import useSWR from "swr";
import { PatientData } from "../../types";
// import axios from "axios";

// const fetcher = (url: string) => axios.get(url).then((res) => res.data);
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
  const { data, isLoading, mutate } = useSWR<PatientData>(
    `${apiUrl}/Patient?Number=${page}&Size=${limit}`,
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
