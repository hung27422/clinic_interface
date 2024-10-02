import useSWR from "swr";
import { MedicationData } from "../../types";
const fetcher = async (url: string) => {
  if (!url) return null; // Tránh gọi fetch nếu URL là null
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
};
interface Props {
  name: string;
  page: number;
  limit: number;
}
function useSearchMedication({ name, page, limit }: Props) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const shouldFetch = name
    ? `${apiUrl}/Medicine/Name/${name}?page=${page}&limit=${limit}`
    : null;
  const { data, isLoading, mutate } = useSWR<MedicationData>(
    shouldFetch,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return { data, isLoading, mutate };
}

export default useSearchMedication;
