import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";

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

export default function ModalReExaminationPatinent() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        Tái khám
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="text-4xl font-bold text-center mb-4">Tái khám</h2>
          <div>
            <div className="mb-3">
              <TextField
                label="Lý do khám"
                variant="outlined"
                className="w-full mb-2 pb-2"
              />
            </div>
            <div className="mb-3">
              <TextField
                label="Tiền căn"
                variant="outlined"
                className="w-full mb-2 pb-2"
              />
            </div>
            <div className="mb-3">
              <TextField
                label="Tổng quát"
                variant="outlined"
                className="w-full mb-2 pb-2"
              />
            </div>{" "}
            <div className="mb-3">
              <TextField
                label="Chuẩn đoán"
                variant="outlined"
                className="w-full mb-2 pb-2"
              />
            </div>
          </div>
          <div className="ml-auto mr-auto w-full text-center">
            <Button style={{ marginRight: "2px" }} variant="contained">
              Lưu
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
