import { FollowUp, FollowUpData, Patient } from "../../../types";
import DeleteInfoExamination from "../Examination/ModalDeleteInfoExamination";
import ModalPrescriptionPatients from "../Prescription/ModalPrescriptionPatients";
import ModalReExaminationPatient from "../Examination/ModalReExaminationPatient";

interface Props {
  dataPatient: Patient;
  dataFollowUp?: FollowUpData;
  mutateFollowUp: () => void;
  mutate: () => void;
  mutatePrescription: () => void;
}
function IsInfoPatients({
  dataPatient,
  dataFollowUp,
  mutateFollowUp,
  mutate,
  mutatePrescription,
}: Props) {
  return (
    <div className="flex flex-col">
      {dataFollowUp?.followUps?.map((item: FollowUp, index) => {
        // Định dạng ngày
        const formattedDate = item.createdAt
          ? new Date(item.createdAt).toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "Đang cập nhật";
        return (
          <div
            key={index}
            className=" flex items-center justify-between border-2 border-primary mb-4 rounded-md px-6 py-2"
          >
            <div className="flex flex-col col-span-2">
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
              <span className="text-2xl">
                <span className="font-bold">Ngày khám:</span> {formattedDate}
              </span>
            </div>
            <div className=" col-span-1 mt-5 flex flex-col items-center justify-center">
              <div className="text-center">
                <ModalPrescriptionPatients
                  flUpId={item.id}
                  patientId={dataPatient.id}
                  mutatePrescription={mutatePrescription}
                />
              </div>
              <div className="my-2">
                <ModalReExaminationPatient
                  mutate={mutateFollowUp}
                  idFollowUp={item.id}
                  data={item}
                />
              </div>
              <div>
                <DeleteInfoExamination
                  dataPatient={dataPatient}
                  idFollowUp={item.id}
                  mutate={mutate}
                  mutateFollowUp={mutateFollowUp}
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
