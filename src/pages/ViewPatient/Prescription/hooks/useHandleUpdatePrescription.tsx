import axios from "axios";
import useToastify from "../../../../hooks/Toastify/useToastify";
import { PrescriptionUpdate } from "../../../../types";
import { useContext } from "react";
import { ClinicContext } from "../../../../Context/ContextClinic";

interface Props {
  idPrescriptions: string;
  mutate: () => void;
  handleClose: () => void;
}

function useHandleUpdatePrescription({
  idPrescriptions,
  mutate,
  handleClose,
}: Props) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const {
    setKeyReloadPrescription,
    setKeyReloadMedicineTop10,
    setKeyReloadMedicineByDate,
    setKeyReloadMedication,
  } = useContext(ClinicContext);
  const { notify } = useToastify({
    title: "Sửa toa thuốc thành công",
    type: "success",
  });

  const handleUpdatePrescription = async (
    newPrescription: PrescriptionUpdate
  ) => {
    try {
      await axios.put(
        `${apiUrl}/Prescription/${idPrescriptions}`,
        newPrescription,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (mutate) mutate();
      if (handleClose) handleClose();
      setKeyReloadMedication((prev) => prev + 1);
      setKeyReloadPrescription((prev) => prev + 1);
      setKeyReloadMedicineTop10((prev) => prev + 1);
      setKeyReloadMedicineByDate((prev) => prev + 1);
      notify();
    } catch (error) {
      console.error("Failed to update prescription", error);
      alert("Failed to update prescription.");
    }
  };

  return { handleUpdatePrescription };
}

export default useHandleUpdatePrescription;
