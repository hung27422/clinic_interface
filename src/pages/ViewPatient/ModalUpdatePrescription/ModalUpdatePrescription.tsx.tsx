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
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const InfoPrescriptions = [
  {
    id: 1,
    name: "Kẹo",
    quantity: 2,
    numberDate: 2,
  },
  { id: 2, name: "Kem", quantity: 2, numberDate: 2 },
  { id: 3, name: "Bánh", quantity: 3, numberDate: 3 },
  {
    id: 1,
    name: "Kẹo",
    quantity: 2,
    numberDate: 2,
  },
  { id: 2, name: "Kem", quantity: 2, numberDate: 2 },
  { id: 3, name: "Bánh", quantity: 3, numberDate: 3 },
  {
    id: 1,
    name: "Kẹo",
    quantity: 2,
    numberDate: 2,
  },
  { id: 2, name: "Kem", quantity: 2, numberDate: 2 },
  { id: 3, name: "Bánh", quantity: 3, numberDate: 3 },
];
export default function ModalUpdatePrescription() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        style={{ width: "130px" }}
      >
        Sửa
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="h-[600px] overflow-hidden overflow-y-auto hidden-scrollbar">
            <div className="flex items-center text-center justify-between mb-5">
              <div className="w-[25%]"></div>
              <h2 className="text-3xl font-bold text-center w-[50%]">
                Sửa Thông Tin Kê Toa Thuốc
              </h2>
              <div className="w-[25%] text-right">
                <Button
                  style={{ width: "50px" }}
                  variant="contained"
                  onClick={handleClose}
                  color="error"
                >
                  X
                </Button>
              </div>
            </div>
            {InfoPrescriptions.map((item, index) => {
              return (
                <div key={index} className="grid grid-cols-3 ">
                  <div className="col-span-1 ml-3 mb-2">
                    <TextField
                      label={`Tên Thuốc`}
                      variant="outlined"
                      value={item.name}
                      className="w-full"
                    />
                  </div>
                  <div className="col-span-1 ml-3 mb-2">
                    <TextField
                      label={"Số lượng"}
                      value={item.quantity}
                      variant="outlined"
                      className="w-full "
                    />
                  </div>
                  <div className="col-span-1 ml-3 mb-2">
                    <TextField
                      label={"Số ngày dùng"}
                      value={item.numberDate}
                      variant="outlined"
                      className="w-full "
                    />
                  </div>
                </div>
              );
            })}
            <div className="text-center mt-2 mb-2">
              <Button style={{ width: "100px" }} variant="contained">
                Lưu
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
