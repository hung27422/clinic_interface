import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { Medication } from "../../../types";
import useHandleUpdateMedication from "../hook/useHandleUpdateMedication";

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
  data: Medication;
  mutate: () => void;
}
export default function ModalUpdateMedication({ data, mutate }: Props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { handleUpdateInfoPatient } = useHandleUpdateMedication({
    id: data.id,
    handleClose: handleClose,
    mutate: mutate,
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
  const handleUpdateMedication = () => {
    const price = Number(value.price);
    const quantity = Number(value.quantity);
    handleUpdateInfoPatient({
      id: data.id,
      name: value.name,
      company: value.company,
      price: price,
      quantity: quantity,
      status: value.status,
    });
  };
  React.useEffect(() => {
    if (data) {
      setValue(data);
    }
  }, [data]);
  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Sửa
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="text-4xl font-bold text-center mb-4">
            Sửa Thông Tin Thuốc
          </h2>
          <div>
            <div className="mb-3">
              <TextField
                label="Tên"
                variant="outlined"
                name="name"
                className="w-full mb-2 pb-2"
                value={value.name}
                onChange={handleChangeValue}
              />
            </div>
            <div className="mb-3">
              <TextField
                label="Công ty"
                variant="outlined"
                name="company"
                className="w-full mb-2 pb-2"
                value={value.company}
                onChange={handleChangeValue}
              />
            </div>
            <div className="mb-3">
              <TextField
                label="Số lượng"
                variant="outlined"
                name="quantity"
                className="w-full mb-2 pb-2"
                value={value.quantity}
                onChange={handleChangeValue}
              />
            </div>{" "}
            <div className="mb-3">
              <TextField
                label="Giá"
                variant="outlined"
                name="price"
                className="w-full mb-2 pb-2"
                value={value.price}
                onChange={handleChangeValue}
              />
            </div>
            <div className="mb-3">
              <TextField
                label="Tình trạng"
                variant="outlined"
                name="status"
                className="w-full mb-2 pb-2"
                value={value.status}
                onChange={handleChangeValue}
              />
            </div>
          </div>
          <div className="ml-auto mr-auto w-full text-center">
            <Button
              onClick={handleUpdateMedication}
              style={{ marginRight: "2px" }}
              variant="contained"
            >
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
