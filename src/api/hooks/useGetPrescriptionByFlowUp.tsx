import useSWR from "swr";
import { PrescriptionData } from "../../types";

interface Props {
  idFollowUp: string;
}

function useGetPrescriptionByFlowUp({ idFollowUp }: Props) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const shouldFetch = `${apiUrl}/Prescription/FollowUp/${idFollowUp}`;
  const { data, isLoading, mutate } = useSWR<PrescriptionData>(shouldFetch);

  return { data, isLoading, mutate };
}

export default useGetPrescriptionByFlowUp;
