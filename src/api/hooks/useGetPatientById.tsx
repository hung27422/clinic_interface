import useSWR from "swr";
import { PatientDataObj } from "../../types";

interface Props {
  id: string;
}

function useGetPatientById({ id }: Props) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { data, isLoading, mutate } = useSWR<PatientDataObj>(
    `${apiUrl}/Patient/${id}`
  );

  return { data, isLoading, mutate };
}

export default useGetPatientById;
