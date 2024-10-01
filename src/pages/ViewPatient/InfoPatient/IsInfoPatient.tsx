import { FollowUp, FollowUpData, Patient } from "../../../types";
import ModalPrescriptionPatients from "../ModalPrescriptionPatients/ModalPrescriptionPatients";
import ModalReExaminationPatient from "../ModalReExaminationPatient/ModalReExaminationPatient";

interface Props {
  dataPatient: Patient;
  dataFollowUp?: FollowUpData;
  mutateFollowUp: () => void;
}
function IsInfoPatients({ dataPatient, dataFollowUp, mutateFollowUp }: Props) {
  return (
    <div className="flex flex-col">
      {dataFollowUp?.followUp?.map((item: FollowUp, index) => {
        return (
          <div key={index} className="flex flex-col">
            <div className="mb-4">
              <span className="text-2xl">
                Thông tin của bệnh nhân
                <span className="text-red-500 font-semibold">
                  {" " + dataPatient.name}
                </span>
              </span>
            </div>
            <span className="text-2xl">
              <span className="font-bold">Lý do khám:</span> {item.reason}
            </span>
            <span className="text-2xl">
              <span className="font-bold">Tiền căn:</span> {item.history}
            </span>
            <span className="text-2xl">
              <span className="font-bold">Tổng quát:</span> {item.diagnosis}
            </span>
            <span className="text-2xl">
              <span className="font-bold">Chuẩn đoán:</span> {item.summary}
            </span>
            <div className="mt-5 flex items-center">
              <div className="mr-2">
                <ModalPrescriptionPatients />
              </div>
              <div>
                <ModalReExaminationPatient
                  mutate={mutateFollowUp}
                  idFollowUp={item.id}
                  data={item}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default IsInfoPatients;
