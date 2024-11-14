import axios from "axios";
import useToastify from "../../../../hooks/Toastify/useToastify";
import { PrescriptionUpdate } from "../../../../types";

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
      notify();
    } catch (error) {
      console.error("Failed to update prescription", error);
      alert("Failed to update prescription.");
    }
  };

  return { handleUpdatePrescription };
}

export default useHandleUpdatePrescription;
