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
  border: "2px solid #1b9fc9",
  boxShadow: 24,
  p: 4,
  borderRadius: 6,
};

export default function ModalPrescriptionPatients() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [medicinal, setMedicinal] = React.useState([
    { id: 1, label: "Tên thuốc" },
  ]);
  const [quantityMedicinal, setQuantityMedicinal] = React.useState([
    { id: 1, label: "Số lượng" },
  ]);
  const [numberDate, setNumberDate] = React.useState([
    { id: 1, label: "Số ngày dùng" },
  ]);
  const addFields = () => {
    const newId = medicinal.length + 1;
    setMedicinal([...medicinal, { id: newId, label: "Tên thuốc" }]);
    setQuantityMedicinal([
      ...quantityMedicinal,
      { id: newId, label: "Số lượng" },
    ]);
    setNumberDate([...numberDate, { id: newId, label: "Số ngày dùng" }]);
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        Kê toa
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="sticky flex justify-between">
            <div className="w-[200px]"></div>
            <div className="w-[200px]">
              <h2 className="text-4xl font-bold text-center mb-4">
                Kê Toa Thuốc
              </h2>
            </div>
            <div className="w-[200px] text-right">
              <Button
                style={{ height: "40px" }}
                variant="contained"
                color="error"
                onClick={handleClose}
              >
                X
              </Button>
            </div>
          </div>
          <div className="h-[400px] overflow-hidden overflow-y-auto hidden-scrollbar">
            <div className="w-full grid grid-cols-3 py-2 ">
              <div className="col-span-1">
                {medicinal.map((field) => (
                  <div className="ml-3 mb-2" key={`medicican-${field.id}`}>
                    <TextField
                      label={field.label}
                      variant="outlined"
                      className="w-full "
                    />
                  </div>
                ))}
              </div>
              <div className="col-span-1">
                {quantityMedicinal.map((field) => (
                  <div
                    className="ml-3 mb-2"
                    key={`quantityMedician-${field.id}`}
                  >
                    <TextField
                      label={field.label}
                      variant="outlined"
                      className="w-full "
                    />
                  </div>
                ))}
              </div>
              <div className="col-span-1">
                {numberDate.map((field) => (
                  <div className="ml-3 mb-2" key={`numberDate-${field.id}`}>
                    <TextField
                      label={field.label}
                      variant="outlined"
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center pt-3">
            <div>
              <Button
                style={{ height: "40px", marginRight: "12px" }}
                variant="contained"
                color="warning"
                onClick={addFields}
              >
                Thêm hàng
              </Button>
              <Button style={{ height: "40px" }} variant="contained">
                Lưu
              </Button>
            </div>

            <span className="text-xl">
              Cập nhật: {new Date().toLocaleDateString()}
            </span>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
