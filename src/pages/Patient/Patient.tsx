import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TablePatient from "./TablePatient/TablePatient";
import ModalAddNewPatient from "./ModalAddNewPatient/ModalAddNewPatient";
import usePatients from "../../api/hooks/usePatients";
import { useContext, useState } from "react";
import useSearchPatient from "../../api/hooks/useSearchPatient";
import PaginationClinic from "../../components/Pagination";
import Spinner from "../../hooks/Spinner/Spinner";
import useDebounce from "../../hooks/components/useDebounce";
import { Button } from "@mui/material";
import { ClinicContext } from "../../Context/ContextClinic";
function Patient() {
  const { setKeyReloadPatient } = useContext(ClinicContext);
  const [page, setPage] = useState(1);
  const [valueSearch, setValueSearch] = useState("");
  const debouncedSearchValue = useDebounce(valueSearch, 2000);
  const { data: dataPatients, mutate } = usePatients({ page: page, limit: 5 });
  const { data: dataSearch } = useSearchPatient({
    phone: debouncedSearchValue || null,
  });

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  // Hàm lấy value search
  const handleSearchPatient = (value: string) => {
    setValueSearch(value);
  };
  const data =
    dataSearch && dataSearch?.patients.length > 0 ? dataSearch : dataPatients;
  const countPage = dataPatients?.pagination?.totalPages || 1;
  const exitDataSearch = dataSearch ? dataSearch?.patients.length > 0 : 0;
  const exitData = dataPatients && dataPatients?.patients.length > 0;
  return (
    <div className="flex min-h-screen flex-col p-2 relative">
      <div>
        <div className="flex items-center justify-between">
          <div className="w-60">
            {exitData && (
              <Button
                color="success"
                variant="contained"
                onClick={() => setKeyReloadPatient((prev) => prev + 1)}
              >
                Làm mới
              </Button>
            )}
          </div>
          <h2 className="flex items-center text-5xl font-bold tracking-widest text-center">
            Danh Sách Bệnh Nhân
          </h2>
          <div className="w-60 text-right">
            <ModalAddNewPatient mutate={mutate} />
          </div>
        </div>
        <div>
          <div className="bg-gray-300 p-2 rounded-md mt-4">
            <FontAwesomeIcon className="mr-4" icon={faMagnifyingGlass} />
            <input
              className="w-[90%] bg-gray-300 text-black outline-none"
              type="text"
              placeholder="Tìm kiếm bệnh nhân theo số điện thoại...."
              value={valueSearch}
              onChange={(e) => handleSearchPatient(e.target.value)}
            />
          </div>
          {valueSearch && !exitDataSearch && (
            <span className="flex items-center justify-center mt-2 text-xl text-red-600 font-medium">
              Không tìm thấy bệnh nhân
            </span>
          )}
        </div>
        <div className="mt-5">
          {data ? (
            <div>
              <TablePatient
                data={data}
                mutate={mutate}
                page={page}
                setPage={setPage}
              />
              <div>
                {countPage > 1 && data && (
                  <div className="flex items-center justify-center py-2 absolute bottom-20 left-0 right-0 mt-5">
                    <PaginationClinic
                      onChange={handleChangePage}
                      count={countPage}
                      page={page}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </div>
  );
}

export default Patient;
