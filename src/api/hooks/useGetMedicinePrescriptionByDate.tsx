import useSWR from "swr";
import { MedicationData } from "../../types";
import { useContext } from "react";
import { ClinicContext } from "../../Context/ContextClinic";

interface Props {
  startDate: string;
  endDate: string;
  page: number;
  limit: number;
}

function useGetMedicinePrescriptionByDate({
  startDate,
  endDate,
  page,
  limit,
}: Props) {
  const { keyReloadMedicineByDate } = useContext(ClinicContext);
  const apiUrl = window.location.origin + "/api";
  const { data, isLoading, mutate } = useSWR<MedicationData>(
    `${apiUrl}/Medicine/Prescription/Range/Start=${startDate}&End=${endDate}?page=${page}&limit=${limit}&reload=${keyReloadMedicineByDate}`
  );
  return { data, isLoading, mutate };
}

export default useGetMedicinePrescriptionByDate;
