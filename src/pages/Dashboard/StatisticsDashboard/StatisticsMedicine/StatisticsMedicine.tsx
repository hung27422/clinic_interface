import { MedicationData } from "../../../../types";
import TableStatisticsMedications from "../../TableInfoStatistics/TableStatisticsMedications/TableStatisticsMedications";
import Spinner from "../../../../hooks/Spinner/Spinner";

interface Props {
  data: MedicationData;
}
function StatisticsMedicine({ data }: Props) {
  if (!data) return <Spinner />;

  const exitDataMedicine = data?.medicines.length > 0;
  return (
    <div>
      <h2 className="font-bold text-2xl mb-2">
        Tổng số thuốc -
        <span className="text-red-500">
          {" " + data.pagination.totalItems || 0}
        </span>
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
    </div>
  );
}

export default StatisticsMedicine;
