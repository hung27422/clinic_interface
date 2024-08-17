import useSWR from "swr";
import { Patient } from "../../types";
import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
interface Props {
  page: number;
  limit: number;
}
function usePatients({ page, limit }: Props) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { data, isLoading, mutate } = useSWR<Patient[]>(
    `${apiUrl}` + `patients?_page=${page}&_limit=${limit}`,
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
