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
  const apiUrl = import.meta.env.VITE_API_URL;
  const { data, isLoading, mutate } = useSWR<PrescriptionData>(
    `${apiUrl}/Prescription/Phone/${phone}?page=${page}&limit=${limit}&reload=${keyReloadPrescription}`
  );

  return { data, isLoading, mutate };
}

export default useGetPrescriptionByPhone;
