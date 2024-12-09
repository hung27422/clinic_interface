import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FollowUpData, Patient } from "../../../types";
import axios from "axios";
import useToastify from "../../../hooks/Toastify/useToastify";
import { ClinicContext } from "../../../Context/ContextClinic";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
interface Props {
  idFollowUp?: string;
  dataPatient?: Patient;
  dataFollowUp?: FollowUpData;
  mutate: () => void;
  mutateFollowUp: () => void;
}
export default function DeleteInfoExamination({
  dataPatient,
  mutateFollowUp,
  idFollowUp,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { setKeyReloadPrescription } = React.useContext(ClinicContext);
  //   Thông báo xóa thông tin bệnh nhân nếu thành công
  const { notify } = useToastify({
    title: `Xóa thông tin bệnh nhân ${dataPatient?.name} thành công`,
    type: "success",
  });

  // Hàm xóa fl up
  const handleDeleteInfoExamination = async () => {
    const apiUrl = window.location.origin + "/api";
    try {
      await axios.delete(`${apiUrl}/FollowUp/${idFollowUp}`);
      //Sau khi xóa update lại checkstatus của bệnh nhân lại bệnh nhân
      mutateFollowUp();
      setKeyReloadPrescription((prev) => prev + 1);
      handleClose();
      notify();
    } catch (err) {
      console.log("Lỗi", err);
    }
  };
  return (
    <div>
      <Button
        style={{ backgroundColor: "red", color: "white" }}
        onClick={handleOpen}
      >
        Xóa thông tin
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <span className="text-2xl text-center block">
              Bạn có chắn chắn muốn xóa thông tin của bệnh nhân
              <span className="text-red-500 font-semibold ">
                {" " + dataPatient?.name}
              </span>
            </span>
            <div className="mt-3 ml-auto mr-auto w-full text-center">
              <Button
                onClick={handleDeleteInfoExamination}
                style={{ marginRight: "2px" }}
                variant="contained"
              >
                Đồng ý
              </Button>
              <Button
                style={{ marginLeft: "2px" }}
                className="ml-2"
                variant="contained"
                color="error"
                onClick={handleClose}
              >
                Hủy
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
