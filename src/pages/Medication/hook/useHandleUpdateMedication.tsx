import axios from "axios";
import { Medication } from "../../../types";
import useToastify from "../../../hooks/components/Toastify/useToastify";
interface Props {
  id: string;
  handleClose: () => void;
  mutate: () => void;
}
function useHandleUpdateMedication({ id, handleClose, mutate }: Props) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { notify } = useToastify({
    title: "Sửa thông tin thuốc thành công.",
    type: "success",
  });
  const handleUpdateInfoMedication = async (medicate: Medication) => {
    try {
      await axios.put(`${apiUrl}/Medicine/${id}`, medicate, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      mutate();
      handleClose();
      notify();
    } catch (error) {
      console.error("Failed to update medication:", error);
      alert("Failed to update medication.");
    }
  };

  return { handleUpdateInfoMedication };
}
export default useHandleUpdateMedication;
