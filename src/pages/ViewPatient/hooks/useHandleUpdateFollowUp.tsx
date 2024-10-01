import axios from "axios";
import useToastify from "../../../hooks/Toastify/useToastify";
import { FollowUp } from "../../../types";
interface Props {
  id: string;
  mutate: () => void;
  handleClose: () => void;
}
function useHandleUpdateFollowUp({ id, mutate, handleClose }: Props) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { notify } = useToastify({
    title: "Tái khám thành công",
    type: "success",
  });
  const handleUpdateFollowUp = async (newFollowUp: FollowUp) => {
    try {
      await axios.put(`${apiUrl}/FollowUp/${id}`, newFollowUp, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (mutate) mutate();
      if (handleClose) handleClose();
      notify();
    } catch (error) {
      console.error("Failed to update patient:", error);
      alert("Failed to update patient.");
    }
  };
  return { handleUpdateFollowUp };
}

export default useHandleUpdateFollowUp;