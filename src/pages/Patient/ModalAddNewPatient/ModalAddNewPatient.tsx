import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import useHandleAddPatient from "./hook/useHandleAddPatient";
import useValidation, {
  ValidationErrorsPatient,
} from "../../../hooks/components/useValidation";
import { ValidationError } from "yup";

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

export default function ModalAddNewPatient({ mutate }: Props) {
  const [errors, setErrors] = React.useState<ValidationErrorsPatient>({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = React.useState(false);
  const { handleSaveInfoPatient } = useHandleAddPatient({
    mutate: mutate,
    handleClose: handleClose,
  });
  const { patientSchema } = useValidation();
  const [patientInfo, setPatientInfo] = React.useState({
    name: "",
    address: "",
    phone: "",
    dob: "",
  });
  // Hàm lấy dữ liệu input
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatientInfo((prev) => ({ ...prev, [name]: value }));
  };
  // Hàm thêm bệnh nhân
  const handleAddInfoPatient = async () => {
    try {
      await patientSchema.validate(patientInfo, { abortEarly: false });
      handleSaveInfoPatient({
        name: patientInfo.name,
        address: patientInfo.address,
        phoneNumber: patientInfo.phone,
        dob: patientInfo.dob,
      });
      setErrors({}); // Reset lỗi nếu thêm thành công
    } catch (err) {
      if (err instanceof ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          // Kiểm tra xem error.path có tồn tại không
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors(validationErrors); // Cập nhật lỗi vào trạng thái
      }
    }
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
                placeholder="Nguyễn Văn A"
                variant="outlined"
                className="w-full mb-2 pb-2"
                name="name"
                onChange={handleChangeValue}
                error={!!errors.name}
                helperText={errors.name}
                FormHelperTextProps={{
                  sx: { fontSize: "1rem" }, // Thay đổi kích thước chữ helperText
                }}
              />
            </div>

            <div className="mb-3">
              <TextField
                label="Địa chỉ"
                placeholder="Thủ Đức - TP.HCM"
                variant="outlined"
                className="w-full mb-2 pb-2"
                name="address"
                onChange={handleChangeValue}
                error={!!errors.address}
                helperText={errors.address}
                FormHelperTextProps={{
                  sx: { fontSize: "1rem" }, // Thay đổi kích thước chữ helperText
                }}
              />
            </div>
            <div className="mb-3">
              <TextField
                label="Số điện thoại"
                placeholder="0987654321"
                variant="outlined"
                name="phone"
                className="w-full mb-2 pb-2"
                onChange={handleChangeValue}
                error={!!errors.phone}
                helperText={errors.phone}
                FormHelperTextProps={{
                  sx: { fontSize: "1rem" }, // Thay đổi kích thước chữ helperText
                }}
              />
            </div>
            <div className="mb-3">
              <TextField
                label="Ngày sinh"
                variant="outlined"
                name="dob"
                placeholder="01-01-2001"
                className="w-full mb-2 pb-2"
                onChange={handleChangeValue}
                error={!!errors.dob}
                helperText={errors.dob}
                FormHelperTextProps={{
                  sx: { fontSize: "1rem" }, // Thay đổi kích thước chữ helperText
                }}
              />
            </div>
          </div>
          <div className="ml-auto mr-auto w-full text-center">
            <Button
              onClick={handleAddInfoPatient}
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
