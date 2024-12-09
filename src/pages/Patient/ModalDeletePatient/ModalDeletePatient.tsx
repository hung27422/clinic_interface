import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Patient } from "../../../types";
// import { mutate } from "swr";
import axios from "axios";
import useToastify from "../../../hooks/Toastify/useToastify";
import { ClinicContext } from "../../../Context/ContextClinic";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  border: "2px solid #1b9fc9",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};
interface Props {
  data: Patient;
  mutate?: () => void;
}

export default function ModalDeletePatient({ data, mutate }: Props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { setKeyReloadPatientByDate } = React.useContext(ClinicContext);
  const { notify } = useToastify({
    title: `Xóa bệnh nhân ${data.name} thành công`,
    type: "success",
  });
  const handleDeletePatient = async () => {
    const apiUrl = window.location.origin + "/api";
    try {
      await axios.delete(`${apiUrl}/Patient/${data.id}`);
      if (mutate) mutate();
      handleClose();
      notify();
      setKeyReloadPatientByDate((prev) => prev + 1);
    } catch (err) {
      console.log("Lỗi", err);
    }
  };
  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="error">
        Xóa
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="text-center">
            <h2 className="text-3xl">
              Bạn chắc chắc muốn xóa bệnh nhân có tên
              <span className="text-red-600"> {data.name}</span>
            </h2>
            <div className="mt-4">
              <Button
                onClick={handleDeletePatient}
                variant="contained"
                style={{ marginRight: "12px" }}
              >
                Đồng ý
              </Button>
              <Button onClick={handleClose} variant="contained" color="error">
                Hủy
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
