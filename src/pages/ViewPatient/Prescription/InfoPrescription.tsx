import { Button } from "@mui/material";
import React from "react";
import { Prescriptions } from "../../../types";

interface Props {
  data: Prescriptions;
}
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
                Tên:
                <span className="font-bold">{" " + data.patient.name}</span>
              </span>
              <span className="text-lg break-words">
                Chuẩn đoán:
                <span className="font-bold"> {" " + data.summary.summary}</span>
              </span>
            </div>
            <span className="col-span-1 text-lg break-words">
              Địa chỉ:
              <span className="font-bold">{" " + data.patient.address} </span>
            </span>
            <span className="col-span-1 text-lg break-words">
              Số diện thoại:
              <span className="font-bold">
                {" " + data.patient.phoneNumber}
              </span>
            </span>
          </div>
        </div>

        <div className="pt-2 mx-4">
          <h2 className="text-xl font-bold underline mb-3">
            Chỉ định dùng thuốc
          </h2>
          {data.products.map((item, index) => {
            return (
              <div key={index}>
                <div className="flex flex-col py-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-normal">{index + 1} .</span>
                      <span className="text-xl font-medium ml-2">
                        {item.name}
                      </span>
                    </div>
                    <div>
                      <span className="text-xl">
                        Số lượng:
                        <span className="font-semibold">
                          {`${" " + item.quantity + " Viên"}`}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="">
                    <span className="text-lg mx-4">
                      Sáng:
                      <span className="font-medium">
                        {`${
                          item.instructions.day
                            ? " " + item.instructions.day + " Viên"
                            : " Không"
                        }`}
                      </span>
                    </span>
                    <span className="text-lg mx-4">
                      Trưa:
                      <span className="font-medium">
                        {`${
                          item.instructions.lunch
                            ? " " + item.instructions.lunch + " Viên"
                            : " Không"
                        }`}
                      </span>
                    </span>
                    <span className="text-lg mx-4">
                      Chiều:
                      <span className="font-medium">
                        {`${
                          item.instructions.afternoon
                            ? " " + item.instructions.afternoon + " Viên"
                            : " Không"
                        }`}
                      </span>
                    </span>
                    <span className="text-lg mx-4">
                      Uống:
                      <span className="font-medium">
                        {`${" " + item.instructions.manual}`}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col ml-4 text-xl mx-4">
          <span className="mt-3">
            Lời dặn: <span className="font-medium">{data.notes}</span>
          </span>
          <div className="flex flex-col items-end justify-center mt-4">
            <div className="my-2">
              <span className="text-xl ">
                Thành tiền:
                <span className="font-medium">{data.totalPrice} VNĐ</span>
              </span>
            </div>
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
