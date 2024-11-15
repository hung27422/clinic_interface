/* eslint-disable react-hooks/exhaustive-deps */
import { DatePicker } from "@mui/x-date-pickers";
import "../../App.css";
import TableStatisticsTop10Medications from "./TableInfoStatistics/TableStatisticsTop10Medications/TableStatisticsTop10Medications";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import StatisticsPatientExamined from "./StatisticsDashboard/StatisticsPatient/StatisticsPatientExamined";
import useGetPatientByDate from "../../api/hooks/useGetPatientByDate";
import useToastify from "../../hooks/Toastify/useToastify";
import useGetMedicinePrescriptionByDate from "../../api/hooks/useGetMedicinePrescriptionByDate";
import StatisticsMedicine from "./StatisticsDashboard/StatisticsMedicine/StatisticsMedicine";
import useGetFirstAndLastDayOfMonth from "../../hooks/components/useGetFirstAndLastDayOfMonth";
import useGetMedicineTop10ByDate from "../../api/hooks/useGetMedicineTop10ByDate";
import PaginationClinic from "../../components/Pagination";
import Spinner from "../../hooks/Spinner/Spinner";
import useCurrentDate from "../../hooks/components/useCurrentDate";
import useGetPatientNotExamined from "../../api/hooks/useGetPatientNotExamined";
import StatisticsPatientNotExamined from "./StatisticsDashboard/StatisticsPatient/StatisticsPatientNotExamined";
function formatNumberWithDots(num: number): string {
  return new Intl.NumberFormat("de-DE").format(num); // 'de-DE' sử dụng dấu chấm cho hàng nghìn
}
function HomePage() {
  const [pageMedicine, setPageMedicine] = useState(1);
  const [pagePatient, setPagePatient] = useState(1);
  const [pagePatientNotExamiend, setPagePatientNotExamiend] = useState(1);
  const [errDate, setErrDate] = useState(false);

  const { currentDate, month, year } = useCurrentDate();

  const { notify } = useToastify({
    title: "Ngày bắt đầu không được lớn hơn ngày kết thúc",
    type: "error",
  });
  // Chuyển trang của thuốc
  const handleChangePageMedicine = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPageMedicine(value);
  };
  // Chuyển trang của bệnh nhân đã khám
  const handleChangePagePatient = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPagePatient(value);
  };
  //Chuyển trang của bệnh nhân chưa khám
  const handleChangePagePatientNotExamined = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPagePatientNotExamiend(value);
  };
  // Lấy ngày đầu tiên và cuối cùng của tháng
  const { firstDay, lastDay } = useGetFirstAndLastDayOfMonth({
    year: year,
    month: month,
  });
  // Set ngày
  const [valueStartDate, setValueStartDate] = useState<Dayjs | null>(null);
  const [valueEndDate, setValueEndDate] = useState<Dayjs | null>(null);
  const startDate = valueStartDate?.format("DD-MM-YYYY").toString();
  const endDate = valueEndDate?.format("DD-MM-YYYY").toString();

  //Kiểm tra nếu ngày bắt đầu lớn hơn ngày kết thúc thì thông báo
  useEffect(() => {
    if (
      valueStartDate &&
      valueEndDate &&
      valueStartDate.isAfter(valueEndDate)
    ) {
      notify();
      setErrDate(true);
    } else {
      setErrDate(false);
    }
  }, [valueStartDate, valueEndDate]);
  // Lấy dữ liệu patient đã khám theo ngày
  const { data: dataPatient } = useGetPatientByDate({
    startDate: startDate || firstDay,
    endDate: endDate || lastDay,
    page: pagePatient,
    limit: 5,
  });
  // Lấy dữ liệu thuốc đã bán theo Ngày
  const { data: dataMedicine } = useGetMedicinePrescriptionByDate({
    startDate: startDate || firstDay,
    endDate: endDate || lastDay,
    page: pageMedicine,
    limit: 5,
  });
  // Lấy dữ liệu top 10 thuốc
  const { data: dataMedicineTop10 } = useGetMedicineTop10ByDate({
    startDate: firstDay,
    endDate: lastDay,
    page: 1,
    limit: 5,
  });
  //Lấy dữ liệu bệnh nhân chưa khám
  const { data: dataPatientNotExamined } = useGetPatientNotExamined({
    limit: 5,
    page: 1,
  });
  const exitDataMedicineTop10 = dataMedicineTop10?.medicines?.length
    ? dataMedicineTop10.medicines.length > 0
    : false;
  const arrTotalPrice = dataMedicine?.medicines.map(
    (item) => item.combinedPrice
  );
  const arrAmount = dataMedicine?.medicines.map((item) => item.amount);

  const totalPrice: number = (arrTotalPrice ?? []).reduce(
    (accumulator: number, currentValue: number | undefined) =>
      accumulator + (currentValue ?? 0),
    0
  );
  const totalAmount: number = (arrAmount ?? []).reduce(
    (accumulator: number, currentValue: number | undefined) =>
      accumulator + (currentValue ?? 0),
    0
  );
  const countPagesMedicine = dataMedicine?.pagination.totalPages || 0;
  const countPagesPatientExamined = dataPatient?.pagination.totalPages || 0;
  const countPagesPatientNotExamined =
    dataPatientNotExamined?.pagination.totalPages || 0;
  const formattedTotalAmount = formatNumberWithDots(totalPrice);
  // Menu statistical
  const statistical = [
    {
      title: "Tổng số bệnh nhân đã khám",
      result: dataPatient?.patients.length || 0,
    },
    {
      title: "Số bệnh nhân chưa khám",
      result: dataPatientNotExamined?.patients.length || 0,
    },
    {
      title: "Tổng số lượng thuốc",
      result: totalAmount,
    },
    {
      title: "Doanh thu",
      result: formattedTotalAmount + " VND",
    },
  ];
  if (!dataMedicine && !dataPatient && !dataMedicineTop10) {
    return (
      <div>
        <h2 className="text-5xl font-bold tracking-widest text-center ">
          Dashboard
        </h2>
        <Spinner />
      </div>
    );
  }
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
            value={valueStartDate}
            defaultValue={dayjs(currentDate)}
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
              className="flex flex-col col-span-1 border-primary border-2 p-4 rounded-lg"
            >
              <span className="text-2xl text-gray-500">{item.title}</span>
              <span className="font-bold text-xl">{item.result}</span>
            </div>
          );
        })}
      </div>
      {/* Thống kê top 10 thuốc bán chạy */}
      <div className="mt-4">
        <h2 className="font-medium text-2xl mb-2">
          Top 10 thuốc bán chạy -
          <span className="text-red-500"> Tháng {month}</span>
        </h2>
        {dataMedicineTop10 && exitDataMedicineTop10 ? (
          <div className="mt-4">
            <TableStatisticsTop10Medications data={dataMedicineTop10} />
          </div>
        ) : (
          <div>
            <span className="border-red-600 border-2 rounded-md p-2 text-2xl text-red-700 my-4 block">
              Chưa có thông tin thuốc được bán trong tháng {month}
            </span>
          </div>
        )}
      </div>
      {/* Thống kê bệnh nhân chưa khám*/}
      {dataPatientNotExamined && (
        <div className="mt-4">
          <StatisticsPatientNotExamined dataPatient={dataPatientNotExamined} />
          <div className="flex items-center justify-center mt-5">
            {countPagesPatientNotExamined > 1 && (
              <PaginationClinic
                onChange={handleChangePagePatientNotExamined}
                count={countPagesPatientNotExamined}
                page={pagePatientNotExamiend}
              />
            )}
          </div>
        </div>
      )}
      {/* Thống kê bệnh nhân đã khám*/}
      {dataPatient && !errDate ? (
        <div className="mt-4">
          <StatisticsPatientExamined dataPatient={dataPatient} />
          <div className="flex items-center justify-center mt-5">
            {countPagesPatientExamined > 1 && (
              <PaginationClinic
                onChange={handleChangePagePatient}
                count={countPagesPatientExamined}
                page={pagePatient}
              />
            )}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="font-bold text-2xl my-2">Tổng số bệnh nhân</h2>
          <span className="border-red-600 border-2 rounded-md p-2 text-2xl text-red-700 my-4 block">
            Vui lòng chọn đúng định dạng ngày để hiện bảng thống kê bệnh nhân
          </span>
        </div>
      )}
      {/* Thống kê thuốc */}
      {dataMedicine && !errDate ? (
        <div className="mt-4">
          <StatisticsMedicine data={dataMedicine} />
          <div className="flex items-center justify-center mt-5">
            {countPagesMedicine > 1 && (
              <PaginationClinic
                onChange={handleChangePageMedicine}
                count={countPagesMedicine}
                page={pageMedicine}
              />
            )}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="font-bold text-2xl my-2">Tổng số thuốc</h2>
          <span className="border-red-600 border-2 rounded-md p-2 text-2xl text-red-700 my-4 block">
            Vui lòng chọn đúng định dạng ngày để hiện bảng thống kê thuốc
          </span>
        </div>
      )}
    </div>
  );
}

export default HomePage;
