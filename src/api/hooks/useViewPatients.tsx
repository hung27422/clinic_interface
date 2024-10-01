import useSWR from "swr";
import { ViewPatient } from "../../types";

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
function useViewPatients({ id }: Props) {
  // const apiUrl = import.meta.env.VITE_API_URL;
  const { data, isLoading } = useSWR<ViewPatient[]>(
    `https://tsv6vm-8080.csb.app/medicalRecords?patientId=${id}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return { data, isLoading };
}

export default useViewPatients;
