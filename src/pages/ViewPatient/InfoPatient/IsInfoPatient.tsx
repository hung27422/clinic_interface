import { FollowUpData } from "../../../types";
import ModalPrescriptionPatients from "../ModalPrescriptionPatients/ModalPrescriptionPatients";
import ModalReExaminationPatient from "../ModalReExaminationPatient/ModalReExaminationPatient";
interface Props {
  data: FollowUpData;
}
function IsInfoPatients({ data }: Props) {
  return (
    <div className="flex flex-col">
      {data.followUps.map((item) => {
        return (
          <div key={item.patientId} className="flex flex-col">
            <span className="text-2xl">
              <span className="font-bold">Lý do khám:</span> {item.checkUp}
            </span>
            <span className="text-2xl">
              <span className="font-bold">Tiền căn:</span> {item.history}
            </span>
            <span className="text-2xl">
              <span className="font-bold">Tổng quát:</span> {item.diagnosis}
            </span>
            <span className="text-2xl">
              <span className="font-bold">Chuẩn đoán:</span> {item.diagnosis}
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
      })}
    </div>
  );
}

export default IsInfoPatients;
