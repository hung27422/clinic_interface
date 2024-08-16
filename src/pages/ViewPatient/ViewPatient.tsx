import { Link } from "react-router-dom";
import config from "../../configs/configs";
import InfoPatient from "./InfoPatient/InfoPatient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import TableInfoPrescription from "./InfoPatient/TableInfoPrescription";

import ModalUpdatePrescription from "./ModalUpdatePrescription/ModalUpdatePrescription.tsx";
import ModalPrint from "./ModalPrint/ModalPrint.tsx";

function ViewPatients() {
  const isPres = true;
  return (
    <div>
      <div className="grid grid-cols-3 items-center">
        <div className="col-span-1">
          <Link to={config.router.patients}>
            <FontAwesomeIcon className="text-2xl" icon={faArrowLeft} />
          </Link>
        </div>
        <h2 className="col-span-1 text-5xl text-center font-bold">
          Thông Tin Bệnh Nhân
        </h2>
        <div className="col-span-1"></div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-10">
        <div className="col-span-1">
          <InfoPatient />
        </div>
        {isPres ? (
          <div className="col-span-1">
            <h2 className="text-center text-3xl font-semibold mb-3">
              Thông tin thuốc kê toa
            </h2>
            <div>
              <TableInfoPrescription />
            </div>
            <div className="flex items-center justify-center mt-3">
              <div className="mr-2">
                <ModalUpdatePrescription />
              </div>
              <div>
                <ModalPrint />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-semibold text-center ">
              Thông tin toa thuốc
            </h2>
            <h2 className="text-3xl text-gray-500 text-center">
              Chưa có toa thuốc nào!!!
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewPatients;
