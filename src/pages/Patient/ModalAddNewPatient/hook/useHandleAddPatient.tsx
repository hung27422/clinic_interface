import { useNavigate } from "react-router";
import config from "../../../../configs/configs";
import axios from "axios";
import { Patient } from "../../../../types";
import { v4 as uuidv4 } from "uuid";
import { mutate } from "swr";
interface Props {
  mutate: () => void;
}
function useHandleAddPatient({ mutate: onAdd }: Props) {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const totalPages = 3;
  const limit = 5;
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
      for (let page = 1; page <= totalPages; page++) {
        mutate(`${apiUrl}patients?_page=${page}&_limit=${limit}`);
      }
      onAdd();
      navigate(`${config.router.viewpatient}123`);
    } catch (error) {
      console.error("Failed to add patient:", error);
      alert("Failed to add patient.");
    }
  };

  return { handleSaveInfoPatient };
}

export default useHandleAddPatient;
