import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import config from "../../configs/configs";
import ModalPrescriptionPatients from "./ModalPrescriptionPatients/ModalPrescriptionPatients";
import ModalReExaminationPatinent from "./ModalReExaminationPatinent/ModalReExaminationPatinent";

function ViewPatients() {
  const isInfo = true;
  return (
    <div>
      <h2 className="text-5xl text-center font-bold">Thông Tin Bệnh Nhân</h2>
      <div>
        {isInfo ? (
          <div className="flex flex-col ">
            <span className="text-2xl">
              <span className="font-bold">Tên:</span> Phi Nguyễn
            </span>
            <span className="text-2xl">
              <span className="font-bold">Lý do khám:</span> Có thai
            </span>
            <span className="text-2xl">
              <span className="font-bold">Tiền căn:</span> Không có
            </span>
            <span className="text-2xl">
              <span className="font-bold">Tổng quát:</span> Tốt
            </span>
            <span className="text-2xl">
              <span className="font-bold">Chuẩn đoán:</span> 3 tháng nữa đẻ (Con
              trai)
            </span>
            <div className="mt-5 flex items-center">
              <div className="mr-2">
                <ModalPrescriptionPatients />
              </div>
              <div>
                <ModalReExaminationPatinent />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full text-center mt-2">
            <span className="block p-2">
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
      <div className="mt-36 text-center absolute bottom-4 left-[52%]">
        <Link to={config.router.patients}>
          <Button variant="contained" color="primary">
            Trở về trang trước
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default ViewPatients;
