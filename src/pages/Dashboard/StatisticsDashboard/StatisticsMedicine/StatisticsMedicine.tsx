import { useState } from "react";
import PaginationClinic from "../../../../components/Pagination";
import { MedicationData } from "../../../../types";
import TableStatisticsMedications from "../../TableInfoStatistics/TableStatisticsMedications/TableStatisticsMedications";
import Spinner from "../../../../hooks/Spinner/Spinner";

interface Props {
  data: MedicationData;
}
function StatisticsMedicine({ data }: Props) {
  const [page, setPage] = useState(1);
  if (!data) return <Spinner />;
  const countPages = data?.pagination.totalPages || 0;
  const exitDataMedicine = data?.medicines.length > 0;
  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  return (
    <div>
      <h2 className="font-bold text-2xl mb-2">
        Tổng số thuốc -
        <span className="text-red-500">{" " + data.medicines.length || 0}</span>
      </h2>
      {exitDataMedicine ? (
        <TableStatisticsMedications data={data} />
      ) : (
        <div>
          <span className="border-red-600 border-2 rounded-md p-2 text-2xl text-red-700 my-4 block">
            Chưa có thông tin thuốc được bán!!!
          </span>
        </div>
      )}
      <div className="flex items-center justify-center mt-5">
        {data && countPages > 2 && (
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

export default StatisticsMedicine;
