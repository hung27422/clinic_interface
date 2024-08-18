import { useNavigate } from "react-router";
import config from "../../../../configs/configs";
import axios from "axios";
import { Patient } from "../../../../types";
import { v4 as uuidv4 } from "uuid";
interface Props {
  mutate: () => void;
}
function useHandleAddPatient({ mutate }: Props) {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSaveInfoPatient = async (newPatient: Omit<Patient, "id">) => {
    try {
      const newPatientWithId = {
        id: uuidv4(),
        ...newPatient,
      };
      await axios.post(`${apiUrl}patients`, newPatientWithId, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      mutate();
      navigate(`${config.router.viewpatient}123`);
    } catch (error) {
      console.error("Failed to add patient:", error);
      alert("Failed to add patient.");
    }
  };

  return { handleSaveInfoPatient };
}

export default useHandleAddPatient;
