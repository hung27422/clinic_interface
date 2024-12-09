import useSWR from "swr";
import { MedicationData } from "../../types";
import { ClinicContext } from "../../Context/ContextClinic";
import { useContext } from "react";

interface Props {
  startDate: string;
  endDate: string;
  page: number;
  limit: number;
}

function useGetMedicineTop10ByDate({ startDate, endDate, page, limit }: Props) {
  const { keyReloadMedicineTop10 } = useContext(ClinicContext);
  const apiUrl = window.location.origin + "/api";
  const { data, isLoading, mutate } = useSWR<MedicationData>(
    `${apiUrl}/Medicine/Prescription/Range/Top10/Start=${startDate}&End=${endDate}?page=${page}&limit=${limit}&reload=${keyReloadMedicineTop10}`
  );

  return { data, isLoading, mutate };
}

export default useGetMedicineTop10ByDate;
