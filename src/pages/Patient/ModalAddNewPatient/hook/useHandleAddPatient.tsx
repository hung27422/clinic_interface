/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { Patient } from "../../../../types";
import useToastify from "../../../../hooks/components/Toastify/useToastify";
interface Props {
  mutate: () => void;
  handleClose: () => void;
}
function useHandleAddPatient({ mutate, handleClose }: Props) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { notify: notifySuccess } = useToastify({
    title: "Thêm bệnh nhân thành công",
    type: "success",
  });
  const { notify: notifyErr } = useToastify({
    title: "Bệnh nhân này đã được thêm rồi !!!",
    type: "error",
  });
  const handleSaveInfoPatient = async (newPatient: Omit<Patient, "id">) => {
    try {
      const newPatientWithId = {
        ...newPatient,
      };
      await axios.post(`${apiUrl}/Patient`, newPatientWithId, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      notifySuccess();
      mutate();
      handleClose();
    } catch (error: any) {
      if (error.response.data.code === "Patient.ExistPhoneNumber") {
        notifyErr();
      } else {
        console.error("Failed to add patient:", error);
      }
    }
  };

  return { handleSaveInfoPatient };
}

export default useHandleAddPatient;
