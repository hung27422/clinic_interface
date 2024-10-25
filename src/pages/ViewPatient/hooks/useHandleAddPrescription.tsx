/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import useToastify from "../../../hooks/Toastify/useToastify";
import { Prescription } from "../../../types";
interface Props {
  mutate: () => void;
  handleClose: () => void;
}
function useHandleAddPrescription({ mutate, handleClose }: Props) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { notify: notifySuccess } = useToastify({
    title: "Kê toa thuốc thành công",
    type: "success",
  });
  // const { notify: notifyErr } = useToastify({
  //   title: "Bệnh nhân này đã được thêm rồi !!!",
  //   type: "error",
  // });
  const handleSaveInfoPatient = async (
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
      handleClose();
    } catch (error: any) {
      console.error("Failed to add patient:", error);

      // if (error.response.data.code === "Patient.ExistPhoneNumber") {
      //   notifyErr();
      // } else {
      //   console.error("Failed to add patient:", error);
      // }
    }
  };

  return { handleSaveInfoPatient };
}

export default useHandleAddPrescription;
