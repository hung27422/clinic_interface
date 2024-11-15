import Spinner from "../../../../hooks/Spinner/Spinner";
import { PatientDataTemp } from "../../../../types";
import TableStatisticsPatientExamined from "../../TableInfoStatistics/TableStatisticsPatient/TableStatisticsPatientExamined";
interface Props {
  dataPatient: PatientDataTemp;
}
function StatisticsPatientNotExamined({ dataPatient }: Props) {
  if (!dataPatient) return <Spinner />;

  const exitDataPatient = dataPatient?.patients.length > 0;

  return (
    <div>
      <h2 className="font-bold text-2xl mb-2">
        Tổng số bệnh nhân chưa khám -
        <span className="text-red-500">
          {" " + dataPatient.pagination.totalItems || 0}
        </span>
      </h2>
      {exitDataPatient ? (
        <TableStatisticsPatientExamined data={dataPatient} />
      ) : (
        <div>
          <span className="border-red-600 border-2 rounded-md p-2 text-2xl text-red-700 my-4 block">
            Không có bệnh nhân nào!!!
          </span>
        </div>
      )}
    </div>
  );
}

export default StatisticsPatientNotExamined;
