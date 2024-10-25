import useSWR from "swr";
import { PrescriptionData } from "../../types";

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
  phone: string;
  page: number;
  limit: number;
}

function useGetPrescriptionByPhone({ phone, limit, page }: Props) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { data, isLoading, mutate } = useSWR<PrescriptionData>(
    `${apiUrl}/Prescription/Phone/${phone}?page=${page}&limit=${limit}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return { data, isLoading, mutate };
}

export default useGetPrescriptionByPhone;
