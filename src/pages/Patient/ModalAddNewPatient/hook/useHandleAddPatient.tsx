/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useNavigate } from "react-router";
// import config from "../../../../configs/configs";
import axios from "axios";
import { Patient } from "../../../../types";
import useToastify from "../../../../hooks/components/Toastify/useToastify";
interface Props {
  mutate: () => void;
  handleClose: () => void;
}
function useHandleAddPatient({ mutate, handleClose }: Props) {
  // const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const { notify: notifySuccess } = useToastify({
    title: "Thêm bệnh nhân thành công",
    type: "success",
  });
  const { notify: notifyErr } = useToastify({
    title: "Bệnh nhân này đã được thêm rồi !!!",
    type: "error",
  });
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
      notifySuccess();
      mutate();
      handleClose();
      // navigate(`${config.router.viewpatient}123`);
    } catch (error: any) {
      if (
        error.response.data.description ===
        "Phone number: 0989827175 has already been used by another patient"
      ) {
        notifyErr();
      } else {
        console.error("Failed to add patient:", error);
      }
    }
  };

  return { handleSaveInfoPatient };
}

export default useHandleAddPatient;
