import axios from "axios";
import useSWR from "swr";
import { Medication } from "../../types";

interface Props {
  page: number;
  limit: number;
}
const fetcher = (url: string) => axios.get(url).then((res) => res.data);
function useMedications({ page, limit }: Props) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { data, isLoading, mutate } = useSWR<Medication[]>(
    `${apiUrl}` + `medications?_page=${page}&_limit=${limit}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return { data, isLoading, mutate };
}

export default useMedications;
