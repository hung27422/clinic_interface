import ModalPrescriptionPatients from "../ModalPrescriptionPatients/ModalPrescriptionPatients";
import ModalReExaminationPatient from "../ModalReExaminationPatient/ModalReExaminationPatient";

function IsInfoPatients() {
  return (
    <div className="flex flex-col">
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
        <span className="font-bold">Chuẩn đoán:</span> 3 tháng nữa đẻ (Con trai)
      </span>
      <div className="mt-5 flex items-center">
        <div className="mr-2">
          <ModalPrescriptionPatients />
        </div>
        <div>
          <ModalReExaminationPatient />
        </div>
      </div>
    </div>
  );
}

export default IsInfoPatients;
