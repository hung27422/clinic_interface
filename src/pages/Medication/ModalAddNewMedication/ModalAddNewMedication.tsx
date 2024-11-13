import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import useHandleAddMedication from "../hook/useHandleAddMedication";
import useValidation, {
  ValidationErrorsMedicines,
} from "../../../hooks/components/useValidation";
import { ValidationError } from "yup";

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
  borderRadius: 5,
};
interface Props {
  mutate: () => void;
}
export default function ModalAddNewMedication({ mutate }: Props) {
  const [errors, setErrors] = React.useState<ValidationErrorsMedicines>({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { medicineSchema } = useValidation();

  const { handleSaveInfoMedication } = useHandleAddMedication({
    mutate: mutate,
    handleClose: handleClose,
  });
  const [value, setValue] = React.useState({
    name: "",
    company: "",
    specialty: "",
    nutritional: "",
    dosage: "",
    stock: "" as number | "",
    price: "" as number | "",
    type: "",
  });
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };
  const handleSaveMedication = async () => {
    const price = Number(value.price);
    const stock = Number(value.stock);
    try {
      await medicineSchema.validate(value, { abortEarly: false });
      handleSaveInfoMedication({
        name: value.name,
        company: value.company,
        specialty: value.specialty,
        nutritional: value.nutritional,
        dosage: value.dosage,
        stock: stock,
        price: price,
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
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-1">
              <div className="mb-3">
                <TextField
                  label="Tên"
                  variant="outlined"
                  name="name"
                  className="w-full mb-2 pb-2"
                  onChange={handleChangeValue}
                  error={!!errors.name}
                  helperText={errors.name}
                  FormHelperTextProps={{
                    sx: { fontSize: "1rem" },
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
                  label="Biệt dược"
                  variant="outlined"
                  name="specialty"
                  className="w-full mb-2 pb-2"
                  onChange={handleChangeValue}
                  error={!!errors.specialty}
                  helperText={errors.specialty}
                  FormHelperTextProps={{
                    sx: { fontSize: "1rem" }, // Thay đổi kích thước chữ helperText
                  }}
                  onFocus={() =>
                    setErrors((prev) => ({ ...prev, specialty: undefined }))
                  }
                />
              </div>
              <div className="mb-3">
                <TextField
                  label="Hàm lượng"
                  variant="outlined"
                  name="nutritional"
                  className="w-full mb-2 pb-2"
                  onChange={handleChangeValue}
                  error={!!errors.nutritional}
                  helperText={errors.nutritional}
                  FormHelperTextProps={{
                    sx: { fontSize: "1rem" }, // Thay đổi kích thước chữ helperText
                  }}
                  onFocus={() =>
                    setErrors((prev) => ({ ...prev, nutritional: undefined }))
                  }
                />
              </div>
            </div>
            <div className="col-span-1">
              <div className="mb-3">
                <TextField
                  label="Bào chế"
                  variant="outlined"
                  name="dosage"
                  className="w-full mb-2 pb-2"
                  onChange={handleChangeValue}
                  error={!!errors.dosage}
                  helperText={errors.dosage}
                  FormHelperTextProps={{
                    sx: { fontSize: "1rem" }, // Thay đổi kích thước chữ helperText
                  }}
                  onFocus={() =>
                    setErrors((prev) => ({ ...prev, dosage: undefined }))
                  }
                />
              </div>
              <div className="mb-3">
                <TextField
                  label="Số lượng tồn kho"
                  variant="outlined"
                  name="stock"
                  className="w-full mb-2 pb-2"
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
            </div>
          </div>
          <div className="ml-auto mr-auto mt-3 w-full text-center">
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
