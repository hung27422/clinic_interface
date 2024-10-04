import { Link, useParams } from "react-router-dom";
import config from "../../configs/configs";
import InfoPatient from "./InfoPatient/InfoPatient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ModalPrescriptionPatients from "./ModalPrescriptionPatients/ModalPrescriptionPatients.tsx";
import useGetPatientById from "../../api/hooks/useGetPatientById.tsx";
import IsInfoPatients from "./InfoPatient/IsInfoPatient.tsx";
import DeleteInfoExamination from "./ModalDeleteInfoExamination/ModalDeleteInfoExamination.tsx";
import useFollowUp from "../../api/hooks/useFollowUp.tsx";

function ViewPatients() {
  const { id } = useParams<{ id: string }>();
  const { data: dataPatient, mutate } = useGetPatientById({ id: id ?? "" });
  const { data: dataFollowUp, mutate: mutateFollowUp } = useFollowUp({
    patientID: id ?? "",
  });
  // if (!dataFollowUp && !dataFollowUp) return null;
  return (
    <div>
      <div className="grid grid-cols-3 items-center relative">
        <div className="col-span-1">
          <Link to={config.router.patients}>
            <FontAwesomeIcon className="text-2xl" icon={faArrowLeft} />
          </Link>
        </div>
        <h2 className="col-span-1 text-5xl text-center font-bold">
          Thông Tin Khám Bệnh
        </h2>
        <div className="col-span-1"></div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-10">
        <div className="col-span-1">
          {dataPatient?.patient.checkStatus === "not_examined" && (
            <InfoPatient
              idPatient={id}
              dataPatient={dataPatient.patient}
              mutate={mutate}
              mutateFollowUp={mutateFollowUp}
            />
          )}
          {dataPatient?.patient.checkStatus === "examined" && (
            <IsInfoPatients
              dataPatient={dataPatient.patient}
              mutateFollowUp={mutateFollowUp}
              dataFollowUp={dataFollowUp}
            />
          )}
        </div>
        <div className="col-span-1">
          <h2 className="text-3xl font-semibold text-center ">
            Thông tin toa thuốc
          </h2>
          <h2 className="text-3xl text-gray-500 text-center">
            Chưa có toa thuốc nào!!!
          </h2>
          <div className="mt-3 text-center">
            <ModalPrescriptionPatients />
          </div>
        </div>
      </div>
      {dataPatient?.patient.checkStatus === "examined" && (
        <div className="absolute bottom-6">
          <DeleteInfoExamination
            dataPatient={dataPatient?.patient}
            dataFollowUp={dataFollowUp}
            mutate={mutate}
            mutateFollowUp={mutateFollowUp}
          />
        </div>
      )}
    </div>
  );
}

export default ViewPatients;
