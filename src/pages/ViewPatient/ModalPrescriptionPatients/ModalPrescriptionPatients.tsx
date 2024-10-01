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
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #1b9fc9",
  boxShadow: 24,
  p: 4,
  borderRadius: 6,
};

export default function ModalPrescriptionPatients() {
  const [open, setOpen] = React.useState(false);
  const [medicinal, setMedicinal] = React.useState([
    {
      id: 1,
      name: "",
      morning: "",
      afternoon: "",
      night: "",
      time: "Trước khi ăn",
    },
  ]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addFields = () => {
    const newId = medicinal.length + 1;
    setMedicinal([
      ...medicinal,
      {
        id: newId,
        name: "",
        morning: "",
        afternoon: "",
        night: "",
        time: "Trước khi ăn",
      },
    ]);
  };

  const handleChangeValue = (
    id: number,
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setMedicinal((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, [name]: value } : field
      )
    );
  };

  const handleSavePrescription = () => {
    console.log("Danh sách toa thuốc:", medicinal);
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
            {medicinal.map((field, index) => (
              <div className="w-full grid grid-cols-5 py-2 " key={index}>
                <div className="col-span-1 py-1">
                  <TextField
                    label="Tên thuốc"
                    variant="outlined"
                    className="w-full"
                    name="name"
                    value={field.name}
                    onChange={(e) => handleChangeValue(field.id, e)}
                  />
                </div>
                <div className="col-span-3 grid grid-cols-3 gap-1 py-1 px-2">
                  <TextField
                    label="Sáng"
                    variant="outlined"
                    name="morning"
                    className="w-full col-span-1"
                    value={field.morning}
                    onChange={(e) => handleChangeValue(field.id, e)}
                  />
                  <TextField
                    label="Trưa"
                    variant="outlined"
                    name="afternoon"
                    className="w-full col-span-1"
                    value={field.afternoon}
                    onChange={(e) => handleChangeValue(field.id, e)}
                  />
                  <TextField
                    label="Chiều"
                    variant="outlined"
                    name="night"
                    className="w-full col-span-1"
                    value={field.night}
                    onChange={(e) => handleChangeValue(field.id, e)}
                  />
                </div>
                <div className="flex justify-center items-center col-span-1 py-1 mt-1 border-2 rounded-md h-14">
                  <select
                    name="time"
                    className="text-xl outline-none"
                    id="time"
                    value={field.time}
                    onChange={(e) => handleChangeValue(field.id, e)}
                  >
                    <option value="Trước khi ăn">Trước khi ăn</option>
                    <option value="Sau khi ăn">Sau khi ăn</option>
                  </select>
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
              <Button
                onClick={handleSavePrescription}
                style={{ height: "40px" }}
                variant="contained"
              >
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
