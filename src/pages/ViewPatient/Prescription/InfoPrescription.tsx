import { Button } from "@mui/material";
import React from "react";
import { Prescriptions } from "../../../types";

interface Props {
  data: Prescriptions;
}
function formatNumberWithDots(num: number): string {
  return new Intl.NumberFormat("de-DE").format(num); // 'de-DE' sử dụng dấu chấm cho hàng nghìn
}
const convertDateFormatDMY = (dateString: string): string => {
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
};
function InfoPrescription({ data }: Props) {
  const now = new Date();
  const date = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const divRef = React.useRef<HTMLDivElement>(null);
  const handlePrint = () => {
    if (divRef.current) {
      const printContent = divRef.current.innerHTML;
      const originalContent = document.body.innerHTML;
      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload(); // Để refresh lại trang và phục hồi trạng thái ban đầu
    }
  };
  return (
    <div className="relative h-[860px]">
      <div ref={divRef} className="">
        <div className="flex justify-between">
          <div className="flex flex-col items-start">
            <span className="text-sm font-bold">BS Nguyễn Thiên Phúc</span>
            <span className="text-sm font-bold">
              512 Bà Hạt, Phường 8, Quận 10 - Số ĐT: 0337117527
            </span>
            <span className="text-sm font-medium">
              Giấy phép số: 052307/HCM-CCHN
            </span>
            <span className="text-sm font-medium">
              Khám Nội - Nội Tiết - Tim Mạch
            </span>
            <span className="text-sm font-medium">
              Buổi chiều từ 16h30 - 19h
            </span>
            <span className="text-sm font-medium">
              Chủ nhật và Ngày lễ nghỉ
            </span>
          </div>
          <div className="flex-1 flex flex-col items-end">
            <span className="text-sm font-medium">
              Huyết áp:..................... mg/Hg
            </span>
            <span className="text-sm font-medium">
              Mạch:........................ lần/phút
            </span>
            <span className="text-sm font-medium">
              Đường huyết:................ mg/dl
            </span>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-center py-1">TOA THUỐC</h2>
          <div className="mx-3">
            <div className="flex ">
              <span className="text-sm">
                Tên bệnh nhân:
                <span className="font-bold">{" " + data.patient.name}</span>
              </span>
              <span className="col-span-1 text-sm break-words mx-6">
                Giới tính:
                <span className="font-bold">{" " + data.patient.gender}</span>
              </span>
              <span className="col-span-1 text-sm break-words">
                Tuổi:
                <span className="font-bold">{" " + data.patient.age}</span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm">
                Địa chỉ:
                <span className="font-bold">{" " + data.patient.address}</span>
              </span>
              <span className="text-sm break-words">
                Chẩn đoán:
                <span className="font-bold"> {" " + data.summary.summary}</span>
              </span>
            </div>
          </div>
        </div>
        <div className="pt-2 mx-4">
          {data.products.map((item, index) => {
            return (
              <div key={index}>
                <div className="flex flex-col mb-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-normal">{index + 1} .</span>
                      <span className="text-sm font-medium ml-2">
                        {item.name}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm">
                        Số lượng:
                        <span className="font-semibold">
                          {`${" " + item.quantity + " Viên"}`}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm mx-4">
                      Sáng:
                      <span className="font-medium">
                        {`${
                          item.instructions.day
                            ? " " + item.instructions.day + " Viên"
                            : " Không"
                        }`}
                      </span>
                    </span>
                    <span className="text-sm mx-4">
                      Trưa:
                      <span className="font-medium">
                        {`${
                          item.instructions.lunch
                            ? " " + item.instructions.lunch + " Viên"
                            : " Không"
                        }`}
                      </span>
                    </span>
                    <span className="text-sm mx-4">
                      Chiều:
                      <span className="font-medium">
                        {`${
                          item.instructions.afternoon
                            ? " " + item.instructions.afternoon + " Viên"
                            : " Không"
                        }`}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="absolute  bottom-2 left-0 right-0">
          <div className="grid grid-cols-5 justify-between ml-4 text-xl mt-4">
            <div className="col-span-3 flex flex-col">
              <span className="mt-2 text-sm">
                Ngày tái khám:{" "}
                <span className="font-medium">
                  {convertDateFormatDMY(data.revisit)}
                </span>
              </span>
              <span className="mt-1 text-sm">
                Lời dặn: <span className="font-medium">{data.notes}</span>
              </span>
            </div>
            <div className="col-span-2 flex flex-col items-end justify-center">
              <div className="flex flex-col items-center text-sm">
                <span>
                  Ngày {date} tháng {month} năm {year}
                </span>
                <span>Bác sĩ khám bệnh</span>
                <span className="font-semibold mt-12">
                  BS Nguyễn Thiên Phúc
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col border-t-2 border-gray-600 text-center mt-3">
            <span className="text-sm font-semibold mt-2">
              NHỚ MANG THEO TOA NÀY KHI TÁI KHÁM
            </span>
            <span className="text-sm font-semibold">
              Toa thuốc chỉ sử dụng 1 lần
            </span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[-50px] left-0 mt-6 text-center">
        <span className="text-lg">
          Thành tiền:
          <span className="font-bold">
            {" " + formatNumberWithDots(data.totalPrice)} VNĐ
          </span>
        </span>
      </div>
      <div className="absolute bottom-[-50px] left-0 right-0 mt-6 text-center">
        <Button
          style={{ height: "40px" }}
          variant="contained"
          color="success"
          onClick={handlePrint}
        >
          In toa thuốc
        </Button>
      </div>
    </div>
  );
}

export default InfoPrescription;
