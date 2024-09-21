import axios from "axios";
import { Medication } from "../../../types";
interface Props {
  id: string;
  handleClose: () => void;
  mutate: () => void;
}
function useHandleUpdateMedication({ id, handleClose, mutate }: Props) {
  const apiUrl = import.meta.env.VITE_API_URL;
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
    } catch (error) {
      console.error("Failed to update medication:", error);
      alert("Failed to update medication.");
    }
  };

  return { handleUpdateInfoMedication };
}
export default useHandleUpdateMedication;
