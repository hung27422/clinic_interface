import { Link } from "react-router-dom";
import config from "../../configs/configs";
import InfoPatient from "./InfoPatient/InfoPatient";
import InfoPrescription from "./InfoPrescription/InfoPrescription";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function ViewPatients() {
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
      <div className="grid grid-cols-2 mt-10">
        <div className="col-span-1">
          <InfoPatient />
        </div>
        <div className="col-span-1">
          <InfoPrescription />
        </div>
      </div>
    </div>
  );
}

export default ViewPatients;
