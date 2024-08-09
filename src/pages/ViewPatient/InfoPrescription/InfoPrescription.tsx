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
  const isPres = true;

  const divRef = React.useRef<HTMLDivElement>(null);
  const handlePrint = () => {
    if (divRef.current) {
      const printContent = divRef.current.innerHTML;
      const originalContent = document.body.innerHTML;

      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContent;
    }
  };
  return (
    <>
      {isPres ? (
        <div>
          <div ref={divRef} className="p-2">
            <h2 className="text-3xl font-semibold text-center ">
              Thông tin toa thuốc
            </h2>
            <div className="grid grid-cols-3 text-center mt-3 font-semibold border-b-2 pb-2">
              <span className="col-span-1 text-2xl">Tên</span>
              <span className="col-span-1 text-2xl">Số lượng</span>
              <span className="col-span-1 text-2xl">Số ngày dùng</span>
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
      ) : (
        <div>
          <h2 className="text-3xl font-semibold text-center ">
            Thông tin toa thuốc
          </h2>
          <h2 className="text-3xl text-gray-500 text-center">
            Chưa có toa thuốc nào!!!
          </h2>
        </div>
      )}
    </>
  );
}

export default InfoPrescription;
