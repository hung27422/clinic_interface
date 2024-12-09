import axios from "axios";
import useToastify from "../../../../hooks/Toastify/useToastify";
import { FollowUp } from "../../../../types";
interface Props {
  id: string;
  mutate: () => void;
  handleClose: () => void;
}
function useHandleUpdateFollowUp({ id, mutate, handleClose }: Props) {
  const apiUrl = window.location.origin + "/api";
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
      console.error("Failed to update follow up:", error);
      alert("Failed to update follow up.");
    }
  };
  return { handleUpdateFollowUp };
}

export default useHandleUpdateFollowUp;
