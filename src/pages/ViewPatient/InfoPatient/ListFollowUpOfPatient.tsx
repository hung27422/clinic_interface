import useGetPrescriptionByFlowUp from "../../../api/hooks/useGetPrescriptionByFlowUp";
import { Patient } from "../../../types";
import ModalPrint from "../ModalPrint/ModalPrint";
import ModalDeletePrescription from "../Prescription/ModalDeletePrescription";
import ModalUpdatePrescription from "../Prescription/ModalUpdatePrescription.tsx";

interface Props {
  idFlup?: string;
  mutatePrescription: () => void;
  dataPatient?: Patient;
}
function formatDate(isoString: string) {
  const date = new Date(isoString);
  // Get the parts of the date
  const day = String(date.getDate()).padStart(2, "0"); // Day
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month (0-indexed)
  const year = date.getFullYear(); // Year

  // Return formatted date
  return `${day}/${month}/${year}`; // Example format: dd/mm/yyyy
}
function ListFollowUpOfPatient({
  idFlup,
  mutatePrescription,
  dataPatient,
}: Props) {
  const { data: dataPrescription, mutate: mutatePrescriptionByFlowUp } =
    useGetPrescriptionByFlowUp({
      idFollowUp: idFlup || "",
    });
  if (!dataPrescription) return null;
  const ExitdataPrescription = dataPrescription.prescriptions.length > 0;
  return (
    <>
      {ExitdataPrescription && (
        <div className="mt-2 rounded-md h-fit">
          <h2 className="text-2xl font-semibold text-center ">Toa thuốc</h2>
          <div>
            {dataPrescription?.prescriptions.map((item) => {
              const isoString = item.createdAt;
              const formattedDate = formatDate(isoString);
              return (
                <div
                  key={item.id}
                  className="grid grid-cols-3 items-center px-2 py-1 mt-2 justify-center border-gray-400 border-2 rounded-md"
                >
                  <div className="col-span-1">
                    <div className="truncate">
                      <span className="text-xl font-medium">Chẩn đoán:</span>
                      <span className="text-xl">{item.summary.summary}</span>
                    </div>
                    <div className="truncate ">
                      <span className="text-xl font-medium">Ghi chú:</span>
                      <span className="text-xl  overflow-hidden whitespace-nowrap">
                        {item.notes}
                      </span>
                    </div>
                  </div>
                  <div className="col-span-1 text-center">
                    <div>
                      <span className="text-xl font-medium">Ngày khám:</span>
                      <span className="text-xl">{" " + formattedDate}</span>
                    </div>
                  </div>
                  {/* In, sửa, xóa toa thuốc */}
                  <div className="col-span-1 flex items-end justify-end">
                    <div>
                      <ModalPrint data={item} />
                    </div>
                    <div className="mx-4">
                      <ModalUpdatePrescription
                        data={item}
                        mutatePrescription={mutatePrescription}
                        mutatePrescriptionByFlowUp={mutatePrescriptionByFlowUp}
                      />
                    </div>
                    <div className=" flex items-center justify-center w-9 h-9 border-red-400 border-2 rounded-full cursor-pointer">
                      <ModalDeletePrescription
                        idPrescription={item.id}
                        summary={item.summary.summary}
                        dataPatient={dataPatient}
                        mutatePrescription={mutatePrescription}
                        dataPrescription={dataPrescription}
                        mutatePrescriptionByFlowUp={mutatePrescriptionByFlowUp}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default ListFollowUpOfPatient;
