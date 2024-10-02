import useSWR from "swr";
import { PatientData } from "../../types";

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
  phone: string | null;
}
function useSearchPatient({ phone }: Props) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const shouldFetch = phone ? `${apiUrl}/Patient/Phone/${phone}` : null;
  const { data, isLoading, mutate } = useSWR<PatientData>(
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

export default useSearchPatient;
