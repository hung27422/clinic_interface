import useSWR from "swr";
import { FollowUpData } from "../../types";

interface Props {
  patientID: string;
}

function useFollowUp({ patientID }: Props) {
  const apiUrl = window.location.origin + "/api";
  const { data, isLoading, mutate } = useSWR<FollowUpData>(
    `${apiUrl}` + `/FollowUp/Patient/${patientID}`
  );
  return { data, isLoading, mutate };
}

export default useFollowUp;
