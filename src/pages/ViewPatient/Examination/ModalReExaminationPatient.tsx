import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import useHandleUpdateFollowUp from "./hooks/useHandleUpdateFollowUp";
import { FollowUp } from "../../../types";
import useValidation, {
  ValidationErrorsExaminations,
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
  idFollowUp?: string;
  data?: FollowUp;
  mutate: () => void;
}
export default function ModalReExaminationPatient({
  idFollowUp,
  data,
  mutate,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [errors, setErrors] = React.useState<ValidationErrorsExaminations>({});
  const { examinationSchema } = useValidation();

  const [value, setValue] = React.useState({
    reason: "",
    history: "",
    diagnosis: "",
    summary: "",
  });

  const { handleUpdateFollowUp } = useHandleUpdateFollowUp({
    id: idFollowUp ?? "",
    mutate: mutate,
    handleClose: handleClose,
  });
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };
  React.useEffect(() => {
    if (data) {
      setValue({
        reason: data.reason,
        history: data.history,
        diagnosis: data.diagnosis,
        summary: data.summary,
      });
    }
  }, [data]);
  const handleSaveFollowUp = async () => {
    try {
      await examinationSchema.validate(value, { abortEarly: false });
      handleUpdateFollowUp({
        id: data?.id,
        reason: value.reason,
        history: value.history,
        diagnosis: value.diagnosis,
        summary: value.summary,
      });
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
      <Button onClick={handleOpen} variant="contained" color="success">
        Chỉnh sửa
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="text-4xl font-bold text-center mb-4">Tái khám</h2>
          <div>
            <div className="mb-3">
              <TextField
                label="Lý do khám"
                variant="outlined"
                value={value?.reason}
                name="reason"
                className="w-full mb-2 pb-2"
                onChange={handleChangeValue}
                error={!!errors.reason}
                helperText={errors.reason}
                FormHelperTextProps={{
                  sx: { fontSize: "1rem" }, // Thay đổi kích thước chữ helperText
                }}
                onFocus={() =>
                  setErrors((prev) => ({ ...prev, reason: undefined }))
                }
              />
            </div>
            <div className="mb-3">
              <TextField
                label="Tiền căn"
                variant="outlined"
                value={value?.history}
                name="history"
                className="w-full mb-2 pb-2"
                onChange={handleChangeValue}
                error={!!errors.history}
                helperText={errors.history}
                FormHelperTextProps={{
                  sx: { fontSize: "1rem" }, // Thay đổi kích thước chữ helperText
                }}
                onFocus={() =>
                  setErrors((prev) => ({ ...prev, history: undefined }))
                }
              />
            </div>
            <div className="mb-3">
              <TextField
                label="Chẩn đoán"
                value={value?.diagnosis}
                name="diagnosis"
                variant="outlined"
                className="w-full mb-2 pb-2"
                onChange={handleChangeValue}
                error={!!errors.diagnosis}
                helperText={errors.diagnosis}
                FormHelperTextProps={{
                  sx: { fontSize: "1rem" }, // Thay đổi kích thước chữ helperText
                }}
                onFocus={() =>
                  setErrors((prev) => ({ ...prev, diagnosis: undefined }))
                }
              />
            </div>
            <div className="mb-3">
              <TextField
                label="Tổng quát"
                variant="outlined"
                value={value?.summary}
                name="summary"
                className="w-full mb-2 pb-2"
                onChange={handleChangeValue}
                error={!!errors.summary}
                helperText={errors.summary}
                FormHelperTextProps={{
                  sx: { fontSize: "1rem" }, // Thay đổi kích thước chữ helperText
                }}
                onFocus={() =>
                  setErrors((prev) => ({ ...prev, summary: undefined }))
                }
              />
            </div>{" "}
          </div>
          <div className="ml-auto mr-auto w-full text-center">
            <Button
              onClick={handleSaveFollowUp}
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
