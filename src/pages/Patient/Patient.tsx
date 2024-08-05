import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TablePatient from "./TablePatient/TablePatient";
import PaginationClinic from "../../components/Pagination/Pagination";

function Patient() {
  return (
    <div>
      <h2 className="text-5xl font-bold tracking-widest text-center">
        Patient
      </h2>
      <div>
        <div className="bg-gray-300 p-2 rounded-md mt-4">
          <FontAwesomeIcon className="mr-4" icon={faMagnifyingGlass} />
          <input
            className="w-[90%] bg-gray-300 text-black outline-none"
            type="text"
            placeholder="Tìm kiếm bệnh nhân...."
          />
        </div>
      </div>
      <div className="mt-5">
        <TablePatient />
      </div>
      <div className="flex items-center justify-center mt-5">
        <PaginationClinic />
      </div>
    </div>
  );
}

export default Patient;
