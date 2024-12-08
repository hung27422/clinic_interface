import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalAddNewMedication from "./ModalAddNewMedication/ModalAddNewMedication";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import TableMedication from "./TableMedication/TableMedication";
import useMedications from "../../api/hooks/useMedications";
import { useContext, useState } from "react";
import PaginationClinic from "../../components/Pagination";
import Spinner from "../../hooks/Spinner/Spinner";
import useDebounce from "../../hooks/components/useDebounce";
import { Button } from "@mui/material";
import { ClinicContext } from "../../Context/ContextClinic";
import useSearchMedicineOfPrescription from "../../api/hooks/useSearchMedicineOfPrescription";
function Medication() {
  const { setKeyReloadMedication } = useContext(ClinicContext);
  const [page, setPage] = useState(1);

  const [valueSearch, setValueSearch] = useState("");
  const debouncedSearchValue = useDebounce(valueSearch, 1000);
  // Lấy data
  const { data: dataMedications, mutate } = useMedications({
    page: page,
    limit: 5,
  });
  const { data: dataSearch } = useSearchMedicineOfPrescription({
    keyword: debouncedSearchValue,
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

  // Hàm lấy value search
  const handleSearchMedical = (value: string) => {
    setValueSearch(value);
  };
  const data =
    dataSearch && dataSearch?.medicines.length !== 0
      ? dataSearch
      : dataMedications;

  const countPage =
    (dataMedications && dataMedications.pagination.totalPages) || 1;
  const countPageSearch = (dataSearch && dataSearch.pagination.totalPages) || 1;
  const exitData = dataMedications && dataMedications?.medicines.length > 0;

  return (
    <div className="relative min-h-screen">
      <div className="flex items-center justify-between">
        <div className="w-60">
          {exitData && (
            <Button
              variant="contained"
              color="success"
              onClick={() => setKeyReloadMedication((prev) => prev + 1)}
            >
              Làm mới
            </Button>
          )}
        </div>
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
        {valueSearch && !dataSearch ? (
          <div className="text-xl text-center font-bold mt-4 text-red-600">
            Đang tìm kiếm....
          </div>
        ) : (
          <div>
            {valueSearch && dataSearch?.medicines.length === 0 && (
              <span className="flex items-center justify-center mt-2 text-xl text-red-600 font-medium">
                Không tìm thấy thuốc
              </span>
            )}
          </div>
        )}
      </div>
      <div className="mt-5">
        {data ? (
          <div>
            <TableMedication
              data={data}
              mutate={mutate}
              page={page}
              setPage={setPage}
            />
            {data && !dataSearch && countPage > 1 && (
              <div className="flex items-center justify-center py-2 absolute bottom-20 left-0 right-0 mt-5">
                <PaginationClinic
                  onChange={handleChangePage}
                  count={countPage}
                  page={page}
                />
              </div>
            )}
            {data && dataSearch && countPage > 1 && (
              <div className="flex items-center justify-center py-2 absolute bottom-20 left-0 right-0 mt-5">
                <PaginationClinic
                  onChange={handleChangePage}
                  count={countPageSearch}
                  page={page}
                />
              </div>
            )}
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default Medication;
