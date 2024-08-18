import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalAddNewMedication from "./ModalAddNewMedication/ModalAddNewMedication";
import PaginationClinic from "../../components/Pagination/Pagination";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import TableMedication from "./TableMedication/TableMedication";
import useMedications from "../../hooks/api/useMedications";
import { useState } from "react";

function Medication() {
  const [page, setPage] = useState(1);
  const { data: dataMedications, mutate } = useMedications({
    page: page,
    limit: 5,
  });
  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  if (!dataMedications) return null;
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="w-60"></div>
        <h2 className=" text-5xl font-bold tracking-widest text-center">
          Quản Lý Thuốc
        </h2>
        <div className="w-60 text-right">
          <ModalAddNewMedication mutate={mutate} />
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
        <TableMedication data={dataMedications} mutate={mutate} />
      </div>
      <div className="flex items-center justify-center mt-5">
        <PaginationClinic onChange={handleChangePage} count={3} page={page} />
      </div>
    </div>
  );
}

export default Medication;
