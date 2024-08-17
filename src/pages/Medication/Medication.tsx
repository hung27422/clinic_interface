import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalAddNewMedication from "./ModalAddNewMedication/ModalAddNewMedication";
import PaginationClinic from "../../components/Pagination/Pagination";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import TableMedication from "./TableMedication/TableMedication";

function Medication() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="w-60"></div>
        <h2 className=" text-5xl font-bold tracking-widest text-center">
          Quản Lý Thuốc
        </h2>
        <div className="w-60 text-right">
          <ModalAddNewMedication />
        </div>
      </div>
      <div>
        <div className="bg-gray-300 p-2 rounded-md mt-4">
          <FontAwesomeIcon className="mr-4" icon={faMagnifyingGlass} />
          <input
            className="w-[90%] bg-gray-300 text-black outline-none"
            type="text"
            placeholder="Tìm kiếm thuốc...."
          />
        </div>
      </div>
      <div className="mt-5">
        <TableMedication />
      </div>
      <div className="flex items-center justify-center mt-5">
        <PaginationClinic count={10} page={1} />
      </div>
    </div>
  );
}

export default Medication;
