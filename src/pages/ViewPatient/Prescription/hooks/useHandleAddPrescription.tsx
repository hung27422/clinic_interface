/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import useToastify from "../../../../hooks/Toastify/useToastify";
import { Prescription } from "../../../../types";
import { useContext } from "react";
import { ClinicContext } from "../../../../Context/ContextClinic";
interface Props {
  mutate: () => void;
  handleClose: () => void;
  mutatePrescriptionByFlowUp: () => void;
}
function useHandleAddPrescription({
  mutate,
  handleClose,
  mutatePrescriptionByFlowUp,
}: Props) {
  const {
    setKeyReloadPrescription,
    setKeyReloadMedicineTop10,
    setKeyReloadMedicineByDate,
    setKeyReloadMedication,
    errStock,
    setErrStock,
  } = useContext(ClinicContext);
  const apiUrl = window.location.origin + "/api";

  const { notify: notifySuccess } = useToastify({
    title: "Kê toa thuốc thành công",
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
  const handleSaveInfoPrescriptionPatient = async (
    newPrescription: Omit<Prescription, "id">
  ) => {
    try {
      const newPrescriptionWithId = {
        ...newPrescription,
      };
      await axios.post(`${apiUrl}/Prescription`, newPrescriptionWithId, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      notifySuccess();
      mutate();
      mutatePrescriptionByFlowUp();
      setKeyReloadMedication((prev) => prev + 1);
      setKeyReloadPrescription((prev) => prev + 1);
      setKeyReloadMedicineTop10((prev) => prev + 1);
      setKeyReloadMedicineByDate((prev) => prev + 1);
      handleClose();
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

  return { handleSaveInfoPrescriptionPatient };
}

export default useHandleAddPrescription;
