import axios from "axios";
import { Patient } from "../../../../types";
import useToastify from "../../../../hooks/Toastify/useToastify";
import { useContext } from "react";
import { ClinicContext } from "../../../../Context/ContextClinic";
import useGetPatientById from "../../../../api/hooks/useGetPatientById";
interface Props {
  id: string;
  handleClose?: () => void;
  mutate?: () => void;
  notifyShow?: boolean;
}
function useHandleUpdatePatient({
  id,
  handleClose,
  mutate,
  notifyShow,
}: Props) {
  const { setKeyReloadPatientByDate } = useContext(ClinicContext);
  const { mutate: mutatePatient } = useGetPatientById({
    id: id ?? "",
  });

  const apiUrl = window.location.origin + "/api";
  const { notify } = useToastify({
    title: "Sửa thông tin bệnh nhân thành công.",
    type: "success",
  });
  const handleUpdateInfoPatient = async (newPatient: Patient) => {
    try {
      await axios.put(`${apiUrl}/Patient/${id}`, newPatient, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (mutate) mutate();
      if (handleClose) handleClose();
      if (notifyShow) notify();
      if (mutatePatient) mutatePatient();
      setKeyReloadPatientByDate((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to update patient:", error);
      alert("Failed to update patient.");
    }
  };

  return { handleUpdateInfoPatient };
}

export default useHandleUpdatePatient;
