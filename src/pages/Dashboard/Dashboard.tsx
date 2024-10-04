import { DatePicker } from "@mui/x-date-pickers";
import "../../App.css";
import TableStatisticsMedications from "./TableInfoStatistics/TableStatisticsMedications/TableStatisticsMedications";
import TableStatisticsTop10Medications from "./TableInfoStatistics/TableStatisticsTop10Medications/TableStatisticsTop10Medications";
import PaginationClinic from "../../components/Pagination";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import StatisticsPatient from "./StatisticsDashboard/StatisticsPatient/StatisticsPatient";
import useGetPatientByDate from "../../api/hooks/useGetPatientByDate";

const today = new Date();
// Lấy ngày (ngày trong tháng)
const day = today.getDate();
// Lấy tháng
const month = today.getMonth() + 1;
// Lấy năm
const year = today.getFullYear();

function HomePage() {
  const currentDate = `${day}-${month}-${year}`;
  const currentDateValue = `${year}-${month}-${day}`;
  // Set ngày
  const [valueStartDate, setValueStartDate] = useState<Dayjs | null>(dayjs());
  const [valueEndDate, setValueEndDate] = useState<Dayjs | null>(dayjs());
  const startDate = valueStartDate?.format("YYYY-MM-DD").toString();
  const endDate = valueEndDate?.format("YYYY-MM-DD").toString();
  // Lấy dữ liệu patient theo ngày
  const { data: dataPatient } = useGetPatientByDate({
    startDate: startDate || currentDateValue,
    endDate: endDate || currentDateValue,
    page: 1,
    limit: 5,
  });
  // Menu statistical
  const statistical = [
    {
      title: "Tổng số bệnh nhân",
      result: dataPatient?.patients.length || 0,
    },
    {
      title: "Tổng số lượng thuốc",
      result: 50,
    },
  ];
  if (!dataPatient) return null;
  return (
    <div>
      <h2 className="text-5xl font-bold tracking-widest text-center ">
        Dashboard
      </h2>
      {/* Lọc ngày */}
      <div className="flex text-center items-center mt-4 bg-gray-300 p-2 rounded-md">
        <div className="flex items-center mr-3 h-6">
          <span className="mr-2 text-2xl">Từ</span>
          <DatePicker
            label="Ngày bắt đầu"
            defaultValue={dayjs(currentDate)}
            value={valueStartDate}
            onChange={(newValue) => setValueStartDate(newValue)}
          />
        </div>
        <div className="flex items-center mr-3">
          <span className="mr-2 text-2xl">Đến</span>
          <DatePicker
            label="Ngày kết thúc"
            defaultValue={dayjs(currentDate)}
            value={valueEndDate}
            onChange={(newValue) => setValueEndDate(newValue)}
          />
        </div>
      </div>
      {/* Báo cáo thống kê */}
      <div className="grid grid-cols-4 gap-3 mt-4">
        {statistical.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col border-primary border-2 p-4 rounded-lg"
            >
              <span className="text-2xl text-gray-500">{item.title}</span>
              <span className="font-bold text-xl">{item.result}</span>
            </div>
          );
        })}
      </div>
      {/* Thống kê top 10 thuốc bán chạy */}
      <div className="mt-4">
        <h2 className="font-bold text-2xl mb-2">Top 10 thuốc bán chạy</h2>
        <TableStatisticsTop10Medications />
      </div>
      {/* Thống kê bệnh nhân */}
      <div className="mt-4">
        <StatisticsPatient dataPatient={dataPatient} />
      </div>
      {/* Thống kê thuốc */}
      <div className="mt-4">
        <h2 className="font-bold text-2xl mb-2">Tổng số thuốc</h2>
        <TableStatisticsMedications />
        <div className="flex items-center justify-center mt-5">
          <PaginationClinic count={10} page={1} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
