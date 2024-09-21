import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TablePatient from "./TablePatient/TablePatient";
import PaginationClinic from "../../components/Pagination/Pagination";
import ModalAddNewPatient from "./ModalAddNewPatient/ModalAddNewPatient";

import usePatients from "../../hooks/api/usePatients";
import { useEffect, useState } from "react";
import axios from "axios";
import useSWRInfinite from "swr/infinite";
const fetcher = (url: string) => axios.get(url).then((res) => res.data);
function Patient() {
  const [page, setPage] = useState(1);
  const { data: dataPatients } = usePatients({ page: 1, limit: 100 });
  useEffect(() => {
    if (dataPatients) {
      console.log(dataPatients);
    }
  }, [dataPatients]);

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const { mutate } = useSWRInfinite(
    () => `https://localhost:7143/api/Patient`,
    fetcher
  );

  if (!dataPatients) return null;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="w-60"></div>
        <h2 className=" text-5xl font-bold tracking-widest text-center">
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
            placeholder="Tìm kiếm bệnh nhân...."
          />
        </div>
      </div>
      <div className="mt-5">
        <TablePatient data={dataPatients} mutate={mutate} />
      </div>
      <div className="flex items-center justify-center mt-5">
        <PaginationClinic onChange={handleChangePage} count={3} page={page} />
      </div>
    </div>
  );
}

export default Patient;
