import useSWR from "swr";
import { PatientDataTemp } from "../../types";
import { useContext } from "react";
import { ClinicContext } from "../../Context/ContextClinic";

interface Props {
  startDate: string;
  endDate: string;
  page: number;
  limit: number;
}

function useGetPatientByDate({ startDate, endDate, page, limit }: Props) {
  const { keyReloadPatientByDate } = useContext(ClinicContext);
  const apiUrl = window.location.origin + "/api";
  const { data, isLoading, mutate } = useSWR<PatientDataTemp>(
    `${apiUrl}/Patient/Date/Start=${startDate}&End=${endDate}?page=${page}&limit=${limit}&reload=${keyReloadPatientByDate}`
  );

  return { data, isLoading, mutate };
}

export default useGetPatientByDate;
