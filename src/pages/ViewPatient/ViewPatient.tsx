import { Link, useParams } from "react-router-dom";
import config from "../../configs/configs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import useGetPatientById from "../../api/hooks/useGetPatientById.tsx";
import IsInfoPatients from "./InfoPatient/IsInfoPatient.tsx";
import useFollowUp from "../../api/hooks/useFollowUp.tsx";
import useGetPrescriptionByPhone from "../../api/hooks/useGetPrescriptionByPhone.tsx";
import ModalPrint from "./ModalPrint/ModalPrint.tsx";
import ModalAddInfoExamination from "./ModalAddInfoExamination/ModalAddInfoExamination.tsx";
import Spinner from "../../hooks/Spinner/Spinner.tsx";
import PaginationClinic from "../../components/Pagination.tsx";
import { useState } from "react";

function ViewPatients() {
  const [page, setPage] = useState(1);
  // Lấy id của patient
  const { id } = useParams<{ id: string }>();
  const { data: dataPatient, mutate } = useGetPatientById({ id: id ?? "" });
  // Lấy data followUp theo id của patient
  const { data: dataFollowUp, mutate: mutateFollowUp } = useFollowUp({
    patientID: id ?? "",
  });
  // Lấy data của toa thuốc
  const { data: dataPrescription } = useGetPrescriptionByPhone({
    phone: dataPatient?.patient.phoneNumber || "",
    limit: 5,
    page: page,
  });

  // Chuyển trang
  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  if (!dataPrescription && !dataPatient) {
    return <Spinner />;
  }
  // Lấy data đầu tiên của toa thuốc
  const dataPrescriptionFirst =
    dataPrescription?.prescriptions.map((item) => item) || [];
  console.log(dataPrescriptionFirst[0]);

  const totalPages = dataPrescription?.pagination.totalPages || 0;
  const exitPrescription =
    dataPrescription &&
    dataPrescription.prescriptions &&
    dataPrescription.prescriptions.length > 0;
  const exitPagination =
    dataPrescription &&
    dataPrescription.prescriptions &&
    dataPrescription.pagination.totalPages > 1;
  return (
    <div>
      <div className="grid grid-cols-3 items-center">
        <div className="col-span-1">
          <Link to={config.router.patients}>
            <FontAwesomeIcon className="text-2xl" icon={faArrowLeft} />
          </Link>
        </div>
        <h2 className="col-span-1 text-5xl text-center font-bold">
          Thông Tin Khám Bệnh
        </h2>
        <div className="col-span-1 text-right">
          {dataPatient && (
            <ModalAddInfoExamination
              idPatient={id}
              dataPatient={dataPatient.patient}
              mutate={mutate}
              mutateFollowUp={mutateFollowUp}
            />
          )}
        </div>
      </div>

      <div className="mt-10">
        <div className="">
          {/* Bệnh nhân chưa có thông tin khám */}
          {dataPatient?.patient.status === "not_examined" && (
            <div className="text-2xl text-center">
              Hãy thêm bệnh mới cho bệnh nhân{" "}
              <span className="text-red-500 font-semibold">
                {" " + dataPatient.patient.name}
              </span>{" "}
              <div>
                {dataPatient && (
                  <ModalAddInfoExamination
                    idPatient={id}
                    dataPatient={dataPatient.patient}
                    mutate={mutate}
                    mutateFollowUp={mutateFollowUp}
                  />
                )}
              </div>
            </div>
          )}
          {/* Bệnh nhân đã có thông tin khám */}
          {dataPatient?.patient.status === "examined" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="">
                  <span className="text-3xl">
                    Thông tin của bệnh nhân
                    <span className="text-red-500 font-semibold">
                      {" " + dataPatient.patient.name}
                    </span>
                  </span>
                </div>
                <div className="flex items-center">
                  {/* Xem và in */}
                  {exitPrescription && (
                    <div>
                      <ModalPrint data={dataPrescriptionFirst[0]} titleFirst />
                    </div>
                  )}
                </div>
              </div>
              <IsInfoPatients
                dataPatient={dataPatient.patient}
                mutateFollowUp={mutateFollowUp}
                mutate={mutate}
                dataFollowUp={dataFollowUp}
                page={page}
              />
            </div>
          )}
        </div>
        <div>
          {/* Kiểm tra nếu có toa thuốc thì sẽ hiển thị */}
          {exitPrescription && (
            <div>
              <h2 className="text-3xl font-semibold text-center ">
                Thông tin toa thuốc
              </h2>
              <div className="bg-black/10 px-2 py-4 mt-2 rounded-md h-fit">
                {dataPrescription.prescriptions.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="grid grid-cols-3 items-center px-2 py-1 mt-2 justify-center border-primary border-2 rounded-md"
                    >
                      <div className="col-span-1">
                        <div className="truncate">
                          <span className="text-xl font-medium">
                            Chuẩn đoán:
                          </span>
                          <span className="text-xl">
                            {item.summary.summary}
                          </span>
                        </div>
                        <div className="truncate ">
                          <span className="text-xl font-medium">Ghi chú: </span>
                          <span className="text-xl  overflow-hidden whitespace-nowrap">
                            {item.notes}
                          </span>
                        </div>
                      </div>
                      <div className="col-span-1 text-center">
                        <div>
                          <span className="text-xl font-medium">
                            Ngày khám:{" "}
                          </span>
                          <span className="text-xl">20-10-2024</span>
                        </div>
                      </div>
                      <div className="col-span-1 flex items-end justify-end">
                        <ModalPrint data={item} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 flex items-center justify-center">
                {exitPagination && (
                  <PaginationClinic
                    count={totalPages}
                    page={page}
                    onChange={handleChangePage}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewPatients;
