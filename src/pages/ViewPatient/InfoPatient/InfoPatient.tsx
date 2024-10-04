import { Button, TextField } from "@mui/material";
import { useState } from "react";
import useHandleAddFollowUp from "../hooks/useHandleAddFollowUp";
import { Patient } from "../../../types";
interface Props {
  idPatient?: string;
  dataPatient: Patient;
  mutate: () => void; //Muate bệnh nhân
  mutateFollowUp: () => void;
}
function InfoPatient({
  idPatient,
  dataPatient,
  mutate,
  mutateFollowUp,
}: Props) {
  //Định dạng lại ngày dd/mm/yyyy
  const formattedDate = dataPatient.dob.split("-").reverse().join("-");
  const { handleSaveFollowUp } = useHandleAddFollowUp({
    idPatient: dataPatient.id,
    addressPatient: dataPatient.address,
    checkStatus: "examined",
    dobPatient: formattedDate,
    namePatient: dataPatient.name,
    phonePatient: dataPatient.phoneNumber,
    mutate: mutate,
    mutateFollowUp: mutateFollowUp,
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
  const handleAddFollowUp = () => {
    if (!idPatient) {
      return;
    }
    handleSaveFollowUp({
      patientId: idPatient,
      reason: value.reason,
      history: value.history,
      diagnosis: value.diagnosis,
      summary: value.summary,
    });
  };
  return (
    <div>
      <div className="w-full text-center mt-2 mr-2">
        <span className="block p-2 text-xl">
          Chưa có thông tin bệnh của bệnh nhân{" "}
          <span className="text-red-500 font-semibold">{dataPatient.name}</span>
          . Vui lòng nhập thông tin!!
        </span>
        <div>
          <div className="mb-3 mt-2">
            <TextField
              label="Lý do khám"
              variant="outlined"
              className="w-full mb-2 pb-2"
              name="reason"
              onChange={handleChangeValue}
            />
          </div>
          <div className="mb-3">
            <TextField
              label="Tiền căn"
              variant="outlined"
              className="w-full mb-2 pb-2"
              name="history"
              onChange={handleChangeValue}
            />
          </div>
          <div className="mb-3">
            <TextField
              label="Chuẩn đoán"
              variant="outlined"
              name="diagnosis"
              className="w-full mb-2 pb-2"
              onChange={handleChangeValue}
            />
          </div>
          <div className="mb-3">
            <TextField
              label="Tổng quát"
              name="summary"
              variant="outlined"
              className="w-full mb-2 pb-2"
              onChange={handleChangeValue}
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
          >
            Hủy
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InfoPatient;
