import useSWR from "swr";
import { PatientDataObj } from "../../types";

interface Props {
  id: string;
}

function useGetPatientById({ id }: Props) {
  const apiUrl = window.location.origin + "/api";
  const { data, isLoading, mutate } = useSWR<PatientDataObj>(
    `${apiUrl}/Patient/${id}`
  );

  return { data, isLoading, mutate };
}

export default useGetPatientById;
