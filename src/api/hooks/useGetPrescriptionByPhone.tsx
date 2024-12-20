import useSWR from "swr";
import { PrescriptionData } from "../../types";
import { useContext } from "react";
import { ClinicContext } from "../../Context/ContextClinic";

interface Props {
  phone: string;
  page: number;
  limit: number;
}

function useGetPrescriptionByPhone({ phone, limit, page }: Props) {
  const { keyReloadPrescription } = useContext(ClinicContext);
  const apiUrl = window.location.origin + "/api";
  const shouldFetch = phone
    ? `${apiUrl}/Prescription/Phone/${phone}?page=${page}&limit=${limit}&reload=${keyReloadPrescription}`
    : null;
  const { data, isLoading, mutate } = useSWR<PrescriptionData>(shouldFetch);

  return { data, isLoading, mutate };
}

export default useGetPrescriptionByPhone;
