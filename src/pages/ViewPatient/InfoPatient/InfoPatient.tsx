import { Button, TextField } from "@mui/material";
import { useState } from "react";
import useHandleAddFollowUp from "../Examination/hooks/useHandleAddFollowUp";
import { Patient } from "../../../types";
import useValidation, {
  ValidationErrorsExaminations,
} from "../../../hooks/components/useValidation";
import { ValidationError } from "yup";
interface Props {
  idPatient?: string;
  dataPatient: Patient;
  mutate: () => void; //Muate bệnh nhân
  mutateFollowUp: () => void;
  handleClose: () => void;
}
function InfoPatient({
  idPatient,
  dataPatient,
  mutate,
  mutateFollowUp,
  handleClose,
}: Props) {
  const [errors, setErrors] = useState<ValidationErrorsExaminations>({});
  const { examinationSchema } = useValidation();
  //Định dạng lại ngày dd/mm/yyyy
  const formattedDate = dataPatient.dob.split("-").reverse().join("-");
  const { handleSaveFollowUp } = useHandleAddFollowUp({
    idPatient: dataPatient.id,
    addressPatient: dataPatient.address,
    genderPatient: dataPatient.gender,
    checkStatus: "examined",
    dobPatient: formattedDate,
    namePatient: dataPatient.name,
    phonePatient: dataPatient.phoneNumber,
    mutate: mutate,
    mutateFollowUp: mutateFollowUp,
    handleClose: handleClose,
  });
  const [value, setValue] = useState({
    patientId: "",
    reason: "",
    history: "",
    diagnosis: "",
    summary: "",
  });
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddFollowUp = async () => {
    if (!idPatient) {
      return;
    }
    try {
      await examinationSchema.validate(value, { abortEarly: false });
      handleSaveFollowUp({
        patientId: idPatient,
        reason: value.reason,
        history: value.history,
        diagnosis: value.diagnosis,
        summary: value.summary,
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
      <div className="w-full text-center mt-2 mr-2">
        <span className="block p-2 text-2xl">
          Vui lòng nhập thông tin của bệnh nhân
          <span className="text-red-500 font-semibold">
            {" " + dataPatient.name}
          </span>
        </span>
        <div>
          <div className="mb-3 mt-2">
            <TextField
              label="Lý do khám"
              variant="outlined"
              className="w-full mb-2 pb-2"
              name="reason"
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
              className="w-full mb-2 pb-2"
              name="history"
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
              variant="outlined"
              name="diagnosis"
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
              name="summary"
              variant="outlined"
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
          </div>
        </div>
        <div className="ml-auto mr-auto w-full text-center">
          <Button
            onClick={handleAddFollowUp}
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
      </div>
    </div>
  );
}

export default InfoPatient;
