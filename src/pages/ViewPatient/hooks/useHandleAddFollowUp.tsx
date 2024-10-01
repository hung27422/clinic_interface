import axios from "axios";
import { FollowUp } from "../../../types";
import useHandleUpdatePatient from "../../Patient/ModalUpdatePatient/hook/useHandleUpdatePatient";

interface Props {
  idPatient: string;
  namePatient: string;
  addressPatient: string;
  phonePatient: string;
  dobPatient: string;
  checkStatus: string;
  mutate: () => void;
}
function useHandleAddFollowUp({
  idPatient,
  namePatient,
  addressPatient,
  phonePatient,
  dobPatient,
  checkStatus,
  mutate,
}: Props) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { handleUpdateInfoPatient } = useHandleUpdatePatient({
    id: idPatient,
    mutate: mutate,
  });
  //   Update bệnh nhân
  const handleUpdatePatient = () => {
    handleUpdateInfoPatient({
      id: idPatient,
      name: namePatient,
      address: addressPatient,
      phoneNumber: phonePatient,
      dob: dobPatient,
      checkStatus: checkStatus,
    });
  };
  const handleSaveFollowUp = async (newFollowUp: Omit<FollowUp, "id">) => {
    try {
      const newFollowUpWithId = {
        ...newFollowUp,
      };
      await axios.post(`${apiUrl}/FollowUp`, newFollowUpWithId, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      handleUpdatePatient();
      //   notifySuccess();
      //   mutate();

      // navigate(`${config.router.viewpatient}123`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response.data.code === "Patient.ExistPhoneNumber") {
        // notifyErr();
      } else {
        console.error("Failed to add patient:", error);
      }
    }
  };
  return { handleSaveFollowUp };
}
export default useHandleAddFollowUp;
