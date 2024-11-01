import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalAddNewMedication from "./ModalAddNewMedication/ModalAddNewMedication";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import TableMedication from "./TableMedication/TableMedication";
import useMedications from "../../api/hooks/useMedications";
import { useState } from "react";
import useSWRInfinite from "swr/infinite";
import axios from "axios";
import useSearchMedication from "../../api/hooks/useSearchMedication";
import PaginationClinic from "../../components/Pagination";
import Spinner from "../../hooks/Spinner/Spinner";
import useDebounce from "../../hooks/components/useDebounce";
const fetcher = (url: string) => axios.get(url).then((res) => res.data);
function Medication() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [page, setPage] = useState(1);
  const [valueSearch, setValueSearch] = useState("");
  const debouncedSearchValue = useDebounce(valueSearch, 1000);
  // Lấy data
  const { data: dataMedications } = useMedications({
    page: page,
    limit: 6,
  });
  const { data: dataSearch } = useSearchMedication({
    name: debouncedSearchValue,
    limit: 5,
    page: page,
  });

  // --------------------------------------------------
  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  const { mutate } = useSWRInfinite(
    () => `${apiUrl}/Medicine?page=${page}&limit=6`,
    fetcher
  );
  if (!dataMedications) return null;
  // Hàm lấy value search
  const handleSearchMedical = (value: string) => {
    setValueSearch(value);
  };
  const data =
    dataSearch && dataSearch?.medicines.length !== 0
      ? dataSearch
      : dataMedications;

  const countPage = dataSearch
    ? dataSearch.pagination.totalPages
    : dataMedications.pagination.totalPages;
  return (
    <div className="relative min-h-screen">
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
            value={valueSearch}
            onChange={(e) => handleSearchMedical(e.target.value)}
          />
        </div>
        {valueSearch && dataSearch?.medicines.length === 0 && (
          <span className="flex items-center justify-center mt-2 text-xl text-red-600 font-medium">
            Không tìm thấy thuốc
          </span>
        )}
      </div>
      <div className="mt-5">
        {data ? <TableMedication data={data} mutate={mutate} /> : <Spinner />}
      </div>
      {data && countPage > 1 && (
        <div className="flex items-center justify-center py-2 absolute bottom-20 left-0 right-0 mt-5">
          <PaginationClinic
            onChange={handleChangePage}
            count={countPage}
            page={page}
          />
        </div>
      )}
    </div>
  );
}

export default Medication;
