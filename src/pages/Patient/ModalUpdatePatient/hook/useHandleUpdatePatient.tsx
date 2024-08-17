import axios from "axios";
import { Patient } from "../../../../types";
import { mutate } from "swr";
interface Props {
  id: string;
  handleClose: () => void;
}
function useHandleUpdatePatient({ id, handleClose }: Props) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const totalPages = 3;
  const limit = 5;
  const handleUpdateInfoPatient = async (newPatient: Patient) => {
    try {
      await axios.put(`${apiUrl}patients/${id}`, newPatient, {
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
      console.error("Failed to update patient:", error);
      alert("Failed to update patient.");
    }
  };

  return { handleUpdateInfoPatient };
}

export default useHandleUpdatePatient;
