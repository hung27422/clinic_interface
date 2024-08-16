import { Button } from "@mui/material";
import React from "react";

const InfoPrescriptions = [
  {
    id: 1,
    name: "Kẹo",
    quantity: 2,
    numberDate: 2,
  },
  { id: 2, name: "Kem", quantity: 2, numberDate: 2 },
  { id: 3, name: "Bánh", quantity: 3, numberDate: 3 },
  {
    id: 1,
    name: "Kẹo",
    quantity: 2,
    numberDate: 2,
  },
  { id: 2, name: "Kem", quantity: 2, numberDate: 2 },
  { id: 3, name: "Bánh", quantity: 3, numberDate: 3 },
  {
    id: 1,
    name: "Kẹo",
    quantity: 2,
    numberDate: 2,
  },
  { id: 2, name: "Kem", quantity: 2, numberDate: 2 },
  { id: 3, name: "Bánh", quantity: 3, numberDate: 3 },
];
function InfoPrescription() {
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
    <div>
      <div ref={divRef}>
        <div className="flex flex-col ml-4 items-center">
          <span className="text-2xl font-semibold">Phòng Khám Bác Sĩ Phúc</span>
          <span className="text-lg font-normal text-gray-600">
            512 Bà Hạt,Phường 8, Quận 10, TP.HCM
          </span>
        </div>
        <div className="">
          <h2 className="text-3xl font-semibold text-center py-3">Đơn Thuốc</h2>
          <div className="grid grid-cols-2 mx-4">
            <div className="col-span-1 flex flex-col">
              <span className="text-lg">
                Tên: <span className="font-bold">Phi Nguyễn</span>
              </span>
              <span className="text-lg">
                Chuẩn đoán: <span className="font-bold">Có thai</span>
              </span>
            </div>
            <span className="col-span-1 text-lg">
              Địa chỉ: <span className="font-bold">Cầu Thị Nghè</span>
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 text-center mt-3 font-semibold border-b-2 pb-2">
          <span className="col-span-1 text-xl">Tên thuốc</span>
          <span className="col-span-1 text-xl">Số lượng</span>
          <span className="col-span-1 text-xl">Số ngày dùng</span>
        </div>
        <div className="pt-2 text-center">
          {InfoPrescriptions.map((item, index) => {
            return (
              <div key={index} className="grid grid-cols-3">
                <span className="col-span-1 pb-1 text-xl font-medium">
                  {item.name}
                </span>
                <span className="col-span-1 pb-1 text-xl font-medium">
                  {item.quantity}
                </span>
                <span className="col-span-1 pb-1 text-xl font-medium">
                  {item.numberDate}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col ml-4 text-xl mx-4">
          <span className="mt-3">Lời dặn:</span>
          <div className="flex flex-col items-end justify-center mt-4">
            <div className="flex flex-col items-center">
              <span>
                Ngày {date} tháng {month} năm {year}
              </span>
              <span>Bác sĩ khám bệnh</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 text-center">
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
