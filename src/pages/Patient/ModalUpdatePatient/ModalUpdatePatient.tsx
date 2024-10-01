import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { Patient } from "../../../types";
import useHandleUpdatePatient from "./hook/useHandleUpdatePatient";

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
  data: Patient;
  mutate: () => void;
}
export default function ModalUpdatePatient({ data, mutate }: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState({
    name: "",
    dob: "",
    address: "",
    phoneNumber: "",
    checkStatus: "not_examined",
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { handleUpdateInfoPatient } = useHandleUpdatePatient({
    id: data.id,
    handleClose: handleClose,
    mutate: mutate,
  });
  React.useEffect(() => {
    if (data) {
      setValue({
        name: data.name || "",
        dob: data.dob || "",
        address: data.address || "",
        phoneNumber: data.phoneNumber || "",
        checkStatus: data.checkStatus || "not_examined",
      });
    }
  }, [data]);

  const handleChangeValuePatient = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };
  const handleUpdatePatient = () => {
    handleUpdateInfoPatient({
      id: data.id,
      name: value.name,
      address: value.address,
      phoneNumber: value.phoneNumber,
      dob: value.dob,
      checkStatus: data.checkStatus || "not_examined",
    });
  };
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
            Sửa Thông Bệnh Nhân
          </h2>
          <div>
            <div className="mb-3">
              <TextField
                label="Họ và tên"
                variant="outlined"
                name="name"
                value={value.name}
                className="w-full mb-2 pb-2"
                onChange={handleChangeValuePatient}
              />
            </div>

            <div className="mb-3">
              <TextField
                label="Số điện thoại"
                variant="outlined"
                name="phone"
                value={value.phoneNumber}
                className="w-full mb-2 pb-2"
                onChange={handleChangeValuePatient}
              />
            </div>
            <div className="mb-3">
              <TextField
                label="Địa chỉ"
                variant="outlined"
                name="address"
                value={value.address}
                className="w-full mb-2 pb-2"
                onChange={handleChangeValuePatient}
              />
            </div>
            <div className="mb-3">
              <TextField
                label="Ngày sinh"
                variant="outlined"
                name="dob"
                value={value.dob}
                className="w-full mb-2 pb-2"
                onChange={handleChangeValuePatient}
              />
            </div>
          </div>
          <div className="ml-auto mr-auto w-full text-center">
            <Button
              onClick={handleUpdatePatient}
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
