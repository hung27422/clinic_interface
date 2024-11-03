import axios from "axios";
import useToastify from "../../../../hooks/Toastify/useToastify";
import { PrescriptionUpdate } from "../../../../types";

interface Props {
  _id: string; // đổi id thành _id
  mutate: () => void;
  handleClose: () => void;
}

function useHandleUpdatePrescription({ _id: id, mutate, handleClose }: Props) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { notify } = useToastify({
    title: "Tái khám thành công",
    type: "success",
  });

  const handleUpdatePrescription = async (
    newPrescription: PrescriptionUpdate
  ) => {
    try {
      await axios.put(`${apiUrl}/Prescription/${id}`, newPrescription, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (mutate) mutate();
      if (handleClose) handleClose();
      notify();
    } catch (error) {
      console.error("Failed to update prescription", error);
      alert("Failed to update prescription.");
    }
  };

  return { handleUpdatePrescription };
}

export default useHandleUpdatePrescription;
