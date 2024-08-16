import { Button, TextField } from "@mui/material";
import IsInfoPatient from "./IsInfoPatient";

function InfoPatient() {
  const isInfo = true;
  return (
    <div>
      {isInfo ? (
        <div className="pr-4">
          <IsInfoPatient />
        </div>
      ) : (
        <div className="w-full text-center mt-2 mr-2">
          <span className="block p-2 text-xl">
            Chưa có thông tin bệnh của bệnh nhân. Vui lòng nhập thông tin!!
          </span>
          <div>
            <div className="mb-3 mt-2">
              <TextField
                label="Lý do khám"
                variant="outlined"
                className="w-full mb-2 pb-2"
              />
            </div>
            <div className="mb-3">
              <TextField
                label="Tiền căn"
                variant="outlined"
                className="w-full mb-2 pb-2"
              />
            </div>
            <div className="mb-3">
              <TextField
                label="Tổng quát"
                variant="outlined"
                className="w-full mb-2 pb-2"
              />
            </div>
            <div className="mb-3">
              <TextField
                label="Chuẩn đoán"
                variant="outlined"
                className="w-full mb-2 pb-2"
              />
            </div>
          </div>
          <div className="ml-auto mr-auto w-full text-center">
            <Button style={{ marginRight: "2px" }} variant="contained">
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
      )}
    </div>
  );
}

export default InfoPatient;
