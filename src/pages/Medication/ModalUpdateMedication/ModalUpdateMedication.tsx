import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { Medication } from "../../../types";
import useHandleUpdateMedication from "../hook/useHandleUpdateMedication";
import useValidation, {
  ValidationErrorsMedicines,
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
  data: Medication;
  mutate: () => void;
}
export default function ModalUpdateMedication({ data, mutate }: Props) {
  const [errors, setErrors] = React.useState<ValidationErrorsMedicines>({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { medicineSchema } = useValidation();

  const { handleUpdateInfoMedication } = useHandleUpdateMedication({
    id: data.id,
    handleClose: handleClose,
    mutate: mutate,
  });
  const [value, setValue] = React.useState({
    name: "",
    company: "",
    stock: "" as number | "",
    price: "" as number | "",
    status: "",
    type: "",
  });
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };
  const handleUpdateMedication = async () => {
    const quantity = value.stock ? Number(value.stock) : 0;
    const price = value.price ? Number(value.price) : 0;
    try {
      await medicineSchema.validate(value, { abortEarly: false });
      handleUpdateInfoMedication({
        id: data.id,
        name: value.name,
        company: value.company,
        stock: quantity,
        price: price,
        status: "inventory",
        type: value.type,
      });
      setErrors({});
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
  React.useEffect(() => {
    if (data) {
      setValue({
        name: data.name,
        company: data.company,
        stock: data.stock !== undefined ? data.stock : "",
        price: data.price !== undefined ? data.price : "",
        status: data.status || "",
        type: data.type,
      });
    }
  }, [data]);
  return (
    <div>
      <Button variant="contained" color="success" onClick={handleOpen}>
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
                error={!!errors.name}
                helperText={errors.name}
                FormHelperTextProps={{
                  sx: { fontSize: "1rem" }, // Thay đổi kích thước chữ helperText
                }}
                onFocus={() =>
                  setErrors((prev) => ({ ...prev, name: undefined }))
                }
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
                error={!!errors.company}
                helperText={errors.company}
                FormHelperTextProps={{
                  sx: { fontSize: "1rem" }, // Thay đổi kích thước chữ helperText
                }}
                onFocus={() =>
                  setErrors((prev) => ({ ...prev, company: undefined }))
                }
              />
            </div>
            <div className="mb-3">
              <TextField
                label="Số lượng tồn kho"
                variant="outlined"
                name="stock"
                className="w-full mb-2 pb-2"
                value={value.stock}
                onChange={handleChangeValue}
                error={!!errors.stock}
                helperText={errors.stock}
                FormHelperTextProps={{
                  sx: { fontSize: "1rem" }, // Thay đổi kích thước chữ helperText
                }}
                onFocus={() =>
                  setErrors((prev) => ({ ...prev, stock: undefined }))
                }
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
                error={!!errors.price}
                helperText={errors.price}
                FormHelperTextProps={{
                  sx: { fontSize: "1rem" }, // Thay đổi kích thước chữ helperText
                }}
                onFocus={() =>
                  setErrors((prev) => ({ ...prev, price: undefined }))
                }
              />
            </div>
            <div className="mb-3">
              <TextField
                label="Loại"
                variant="outlined"
                name="type"
                className="w-full mb-2 pb-2"
                value={value.type}
                onChange={handleChangeValue}
                error={!!errors.type}
                helperText={errors.type}
                FormHelperTextProps={{
                  sx: { fontSize: "1rem" }, // Thay đổi kích thước chữ helperText
                }}
                onFocus={() =>
                  setErrors((prev) => ({ ...prev, type: undefined }))
                }
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
