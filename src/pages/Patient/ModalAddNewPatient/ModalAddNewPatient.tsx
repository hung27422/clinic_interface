import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router";
import config from "../../../configs/configs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #1b9fc9",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

export default function ModalAddNewPatient() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const handleSaveInfoPatient = () => {
    navigate(`${config.router.viewpatient}123`);
  };
  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Thêm bệnh nhân
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="text-4xl font-bold text-center mb-4">
            Thêm Bệnh Nhân
          </h2>
          <div>
            <div className="mb-3">
              <TextField
                label="Họ và tên"
                variant="outlined"
                className="w-full mb-2 pb-2"
              />
            </div>
            <div className="mb-3">
              <TextField
                label="Tuổi"
                variant="outlined"
                className="w-full mb-2 pb-2"
              />
            </div>
            <div className="mb-3">
              <TextField
                label="Số điện thoại"
                variant="outlined"
                className="w-full mb-2 pb-2"
              />
            </div>{" "}
            <div className="mb-3">
              <TextField
                label="Địa chỉ"
                variant="outlined"
                className="w-full mb-2 pb-2"
              />
            </div>
          </div>
          <div className="ml-auto mr-auto w-full text-center">
            <Button
              onClick={handleSaveInfoPatient}
              style={{ marginRight: "2px" }}
              variant="contained"
            >
              Thêm
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
        </Box>
      </Modal>
    </div>
  );
}
