import useSWR from "swr";
import { PatientDataObj } from "../../types";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
};

interface Props {
  id: string;
}

function useGetPatientById({ id }: Props) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { data, isLoading, mutate } = useSWR<PatientDataObj>(
    `${apiUrl}/Patient/ID?id=${id}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return { data, isLoading, mutate };
}

export default useGetPatientById;
