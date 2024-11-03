import { useState } from "react";
import PaginationClinic from "../../../../components/Pagination";
import Spinner from "../../../../hooks/Spinner/Spinner";
import { PatientDataTemp } from "../../../../types";
import TableStatisticsPatient from "../../TableInfoStatistics/TableStatisticsPatient/TableStatisticsPatient";
interface Props {
  dataPatient: PatientDataTemp;
}
function StatisticsPatient({ dataPatient }: Props) {
  const [page, setPage] = useState(1);
  if (!dataPatient) return <Spinner />;

  const countPages = dataPatient?.pagination.totalPages || 0;
  const exitDataPatient = dataPatient?.patients.length > 0;
  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  return (
    <div>
      <h2 className="font-bold text-2xl mb-2">
        Tổng số bệnh nhân -
        <span className="text-red-500">
          {" " + dataPatient.pagination.totalItems || 0}
        </span>
      </h2>
      {exitDataPatient ? (
        <TableStatisticsPatient data={dataPatient} />
      ) : (
        <div>
          <span className="border-red-600 border-2 rounded-md p-2 text-2xl text-red-700 my-4 block">
            Không có bệnh nhân nào!!!
          </span>
        </div>
      )}

      <div className="flex items-center justify-center mt-5">
        {dataPatient && countPages > 2 && (
          <PaginationClinic
            onChange={handleChangePage}
            count={countPages}
            page={page}
          />
        )}
      </div>
    </div>
  );
}

export default StatisticsPatient;
