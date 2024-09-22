/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useNavigate } from "react-router";
// import config from "../../../../configs/configs";
import axios from "axios";
import { Patient } from "../../../../types";
interface Props {
  mutate: () => void;
  handleClose: () => void;
}
function useHandleAddPatient({ mutate, handleClose }: Props) {
  // const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSaveInfoPatient = async (newPatient: Omit<Patient, "id">) => {
    try {
      const newPatientWithId = {
        ...newPatient,
      };
      await axios.post(`${apiUrl}/Patient`, newPatientWithId, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      mutate();
      handleClose();
      // navigate(`${config.router.viewpatient}123`);
    } catch (error: any) {
      console.error("Error data:", error.response.data);
    }
  };

  return { handleSaveInfoPatient };
}

export default useHandleAddPatient;
