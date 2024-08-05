import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #1b9fc9",
  boxShadow: 24,
  p: 4,
  borderRadius: 6,
};

export default function ModalInfoPatients() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} className="h-7">
        Thông tin
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h2 className="text-4xl font-bold text-center">Tên: Phi Nguyễn</h2>
            <div className="flex flex-col mt-4">
              <span className="text-2xl">
                <span className="font-bold">Lý do khám:</span> Có thai
              </span>
              <span className="text-2xl">
                <span className="font-bold">Tiền căn:</span> Không có
              </span>
              <span className="text-2xl">
                <span className="font-bold">Tổng quát:</span> Tốt
              </span>
              <span className="text-2xl">
                <span className="font-bold">Chuẩn đoán:</span> 3 tháng nữa đẻ
                (Con trai)
              </span>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
