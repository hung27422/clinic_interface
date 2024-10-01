import axios from "axios";
import { Medication } from "../../../types";
import useToastify from "../../../hooks/Toastify/useToastify";
interface Props {
  mutate: () => void;
  handleClose: () => void;
}

function useHandleAddMedication({ handleClose, mutate: mutateAddNew }: Props) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { notify: notifySuccess } = useToastify({
    title: "Thêm thuốc thành công",
    type: "success",
  });
  const { notify: notifyErr } = useToastify({
    title: "Thuốc này đã được thêm rồi !!!",
    type: "error",
  });
  const handleSaveInfoMedication = async (
    newMedication: Omit<Medication, "id">
  ) => {
    try {
      await axios.post(`${apiUrl}/Medicine`, newMedication, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      handleClose();
      mutateAddNew();
      notifySuccess();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (
        error.response.data.description ===
        "A medicine with the same name already exist"
      ) {
        notifyErr();
      } else {
        console.error("Failed to add medications:", error);
      }
    }
  };

  return { handleSaveInfoMedication };
}

export default useHandleAddMedication;
