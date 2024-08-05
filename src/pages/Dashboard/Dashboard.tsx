import { DatePicker } from "@mui/x-date-pickers";
import "../../App.css";
import TableStatisticsPatient from "./TableStatisticsPatient/TableStatisticsPatient";
import TableStatisticsMedications from "./TableStatisticsMedications/TableStatisticsMedications";
import PaginationClinic from "../../components/Pagination/Pagination";
const statistical = [
  {
    title: "Tổng số bệnh nhân",
    result: 100,
  },
  {
    title: "Tổng số lượng thuốc",
    result: 50,
  },
];
function HomePage() {
  return (
    <div>
      <h2 className="text-5xl font-bold tracking-widest text-center ">
        Dashboard
      </h2>
      {/* Lọc ngày */}
      <div className="flex text-center items-center mt-4 bg-gray-300 p-2 rounded-md">
        <div className="flex items-center mr-3 h-6">
          <span className="mr-2 text-2xl">Từ</span>
          <DatePicker />
        </div>
        <div className="flex items-center mr-3">
          <span className="mr-2 text-2xl">Đến</span>
          <DatePicker />
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
      {/* Thống kê bệnh nhân */}
      <div className="mt-4">
        <h2 className="font-bold text-2xl mb-2">Tổng số bệnh nhân</h2>
        <TableStatisticsPatient />
        <div className="flex items-center justify-center mt-5">
          <PaginationClinic />
        </div>
      </div>
      {/* Thống kê thuốc */}
      <div className="mt-4">
        <h2 className="font-bold text-2xl mb-2">Tổng số thuốc</h2>
        <TableStatisticsMedications />
        <div className="flex items-center justify-center mt-5">
          <PaginationClinic />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
