import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import SelectTextFieldNumber from "./SelectTextFieldNumber";
import SelectTextFieldTime from "./SelectTextFieldTime";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #1b9fc9",
  boxShadow: 24,
  p: 4,
  borderRadius: 6,
};
// interface Dose {
//   id: number;
//   morning: string;
//   afternoon: string;
//   night: string;
// }

// interface Time {
//   id: number;
//   time: string;
// }
export default function ModalPrescriptionPatients() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [medicinal, setMedicinal] = React.useState([
    { id: 1, label: "Tên thuốc" },
  ]);
  // const [doses, setDoses] = React.useState<Dose[]>([
  //   { id: 1, morning: "1", afternoon: "1", night: "1" },
  // ]);
  // const [times, setTimes] = React.useState<Time[]>([
  //   { id: 1, time: "Trước khi ăn" },
  // ]);

  const addFields = () => {
    const newId = medicinal.length + 1;
    setMedicinal([...medicinal, { id: newId, label: "Tên thuốc" }]);
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
          <div className="grid grid-cols-4 mb-4 pb-3 border-b-2 border-gray-300">
            <span className="col-span-1 text-center font-bold text-xl">
              Tên thuốc
            </span>
            <span className="col-span-2 text-center font-bold text-xl">
              Cách uống thuốc
            </span>
            <span className="col-span-1 text-center font-bold text-xl">
              Thời gian uống thuốc
            </span>
          </div>
          <div className="h-[400px] overflow-hidden overflow-y-auto hidden-scrollbar">
            {medicinal.map((field) => (
              <div className="w-full grid grid-cols-4 py-2 " key={field.id}>
                <div className="col-span-1 py-1">
                  <TextField
                    label={field.label}
                    variant="outlined"
                    className="w-full mb-2"
                  />
                </div>
                <div className="col-span-2 py-1">
                  <SelectTextFieldNumber />
                </div>
                <div className="col-span-1 py-1">
                  <SelectTextFieldTime />
                </div>
              </div>
            ))}
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
