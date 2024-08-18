import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import useHandleAddMedication from "../hook/useHandleAddMedication";

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
interface Props {
  mutate: () => void;
}
export default function ModalAddNewMedication({ mutate }: Props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { handleSaveInfoMedication } = useHandleAddMedication({
    mutate: mutate,
    handleClose: handleClose,
  });
  const [value, setValue] = React.useState({
    name: "",
    company: "",
    price: "" as number | "",
    quantity: "" as number | "",
    status: "",
  });
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };
  const handleSaveMedication = () => {
    const price = Number(value.price);
    const quantity = Number(value.quantity);
    handleSaveInfoMedication({
      name: value.name,
      company: value.company,
      price: price,
      quantity: quantity,
      status: value.status,
    });
  };
  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Thêm thuốc
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="text-4xl font-bold text-center mb-4">Thêm Thuốc</h2>
          <div>
            <div className="mb-3">
              <TextField
                label="Tên"
                variant="outlined"
                name="name"
                className="w-full mb-2 pb-2"
                onChange={handleChangeValue}
              />
            </div>
            <div className="mb-3">
              <TextField
                label="Công ty"
                variant="outlined"
                name="company"
                className="w-full mb-2 pb-2"
                onChange={handleChangeValue}
              />
            </div>
            <div className="mb-3">
              <TextField
                label="Số lượng"
                variant="outlined"
                name="quantity"
                className="w-full mb-2 pb-2"
                onChange={handleChangeValue}
              />
            </div>{" "}
            <div className="mb-3">
              <TextField
                label="Giá"
                variant="outlined"
                name="price"
                className="w-full mb-2 pb-2"
                onChange={handleChangeValue}
              />
            </div>
            <div className="mb-3">
              <TextField
                label="Tình trạng"
                variant="outlined"
                name="status"
                className="w-full mb-2 pb-2"
                onChange={handleChangeValue}
              />
            </div>
          </div>
          <div className="ml-auto mr-auto w-full text-center">
            <Button
              onClick={handleSaveMedication}
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
