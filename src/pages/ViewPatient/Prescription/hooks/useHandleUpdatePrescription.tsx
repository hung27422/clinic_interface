/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import useToastify from "../../../../hooks/Toastify/useToastify";
import { PrescriptionUpdate } from "../../../../types";
import { useContext } from "react";
import { ClinicContext } from "../../../../Context/ContextClinic";

interface Props {
  idPrescriptions: string;
  mutate: () => void;
  handleClose: () => void;
  mutatePrescriptionByFlowUp: () => void;
}

function useHandleUpdatePrescription({
  idPrescriptions,
  mutate,
  handleClose,
  mutatePrescriptionByFlowUp,
}: Props) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const {
    setKeyReloadPrescription,
    setKeyReloadMedicineTop10,
    setKeyReloadMedicineByDate,
    setKeyReloadMedication,
    errStock,
    setErrStock,
  } = useContext(ClinicContext);
  const { notify } = useToastify({
    title: "Sửa toa thuốc thành công",
    type: "success",
  });
  const { notify: notifyErr } = useToastify({
    title: `Bạn phải nhập số thuốc "Sáng", "Trưa" hoặc "Chiều" là số.
    Vui lòng kiểm tra lại!!!`,
    type: "error",
  });
  const { notify: notifyErrStock } = useToastify({
    title: `Số lượng thuốc ${errStock} không đủ để kê toa!!!`,
    type: "error",
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
      if (mutatePrescriptionByFlowUp) mutatePrescriptionByFlowUp();
      if (handleClose) handleClose();
      setKeyReloadMedication((prev) => prev + 1);
      setKeyReloadPrescription((prev) => prev + 1);
      setKeyReloadMedicineTop10((prev) => prev + 1);
      setKeyReloadMedicineByDate((prev) => prev + 1);
      notify();
    } catch (error: any) {
      console.error("Failed to add patient:", error);
      const errorMessage = error.response?.data?.description || "";
      console.log(errorMessage);

      if (
        error.response.data.description ===
        "At least one of Day, Lunch, or Afternoon must be a number."
      ) {
        notifyErr();
      } else if (error.response.data.code === "Medicine.InsufficientStock") {
        notifyErrStock();
        const stockError = errorMessage.match(/'([^']+)'/);
        const medicineName = stockError ? stockError[1] : "Không rõ";
        setErrStock(medicineName);
      } else if (error.response.data.includes("System.FormatException")) {
        notifyErr();
      } else {
        console.error("Failed to add prescription:", error);
      }
    }
  };

  return { handleUpdatePrescription };
}

export default useHandleUpdatePrescription;
