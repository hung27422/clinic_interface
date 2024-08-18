import axios from "axios";
import { Medication } from "../../../types";
import { mutate } from "swr";
interface Props {
  mutate: () => void;
  handleClose: () => void;
}
function useHandleAddMedication({ handleClose }: Props) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const totalPages = 3;
  const limit = 5;
  const handleSaveInfoMedication = async (
    newMedication: Omit<Medication, "id">
  ) => {
    try {
      await axios.post(`${apiUrl}medications`, newMedication, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      for (let page = 1; page <= totalPages; page++) {
        mutate(`${apiUrl}patients?_page=${page}&_limit=${limit}`);
      }
      handleClose();
    } catch (error) {
      console.error("Failed to add medications:", error);
      alert("Failed to add medications.");
    }
  };

  return { handleSaveInfoMedication };
}

export default useHandleAddMedication;
