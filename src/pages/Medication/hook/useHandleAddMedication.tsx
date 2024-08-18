import axios from "axios";
import { Medication } from "../../../types";
interface Props {
  mutate: () => void;
  handleClose: () => void;
}

function useHandleAddMedication({ handleClose, mutate: mutateAddNew }: Props) {
  const apiUrl = import.meta.env.VITE_API_URL;
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
      mutateAddNew();
      handleClose();
    } catch (error) {
      console.error("Failed to add medications:", error);
      alert("Failed to add medications.");
    }
  };

  return { handleSaveInfoMedication };
}

export default useHandleAddMedication;
