import { MedicationData } from "../../../../types";
import Spinner from "../../../../hooks/Spinner/Spinner";
import TableStatisticsTop10Medications from "../../TableInfoStatistics/TableStatisticsTop10Medications/TableStatisticsTop10Medications";

interface Props {
  data: MedicationData;
}
function StatisticsMedicineTop10({ data }: Props) {
  if (!data) return <Spinner />;
  return (
    <div>
      <TableStatisticsTop10Medications data={data} />
    </div>
  );
}

export default StatisticsMedicineTop10;
