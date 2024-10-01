import axios from "axios";
import { Patient } from "../../../../types";
import useToastify from "../../../../hooks/Toastify/useToastify";
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
  const apiUrl = import.meta.env.VITE_API_URL;
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
    } catch (error) {
      console.error("Failed to update patient:", error);
      alert("Failed to update patient.");
    }
  };

  return { handleUpdateInfoPatient };
}

export default useHandleUpdatePatient;
