import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalAddNewMedication from "./ModalAddNewMedication/ModalAddNewMedication";
import PaginationClinic from "../../components/Pagination/Pagination";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import TableMedication from "./TableMedication/TableMedication";
import useMedications from "../../hooks/api/useMedications";
import { useState } from "react";
import useSWRInfinite from "swr/infinite";
import axios from "axios";
const fetcher = (url: string) => axios.get(url).then((res) => res.data);
function Medication() {
  const [page, setPage] = useState(1);
  const { data: dataMedications } = useMedications({
    page: page,
    limit: 3,
  });
  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  const { mutate } = useSWRInfinite(
    () => `https://localhost:7143/api/Medicine?page=1&limit=10`,
    fetcher
  );
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
