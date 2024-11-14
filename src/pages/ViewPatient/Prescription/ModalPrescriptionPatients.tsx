/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import "tippy.js/dist/tippy.css";
import Tippy from "@tippyjs/react/headless";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCheck,
  faRotateRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import useHandleAddPrescription from "./hooks/useHandleAddPrescription";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1100,
  bgcolor: "background.paper",
  border: "2px solid #1b9fc9",
  boxShadow: 24,
  p: 4,
  borderRadius: 6,
};
interface Props {
  flUpId?: string;
  patientId?: string;
  mutatePrescription: () => void;
}

import { ValidationError } from "yup";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import useGetDateReExamDefault from "../../../hooks/components/useGetDateReExamDefault";
import useSearchMedicineOfPrescription from "../../../api/hooks/useSearchMedicineOfPrescription";
// import * as Yup from "yup";
import useValidation, {
  ValidationErrorsPrescriptions,
} from "../../../hooks/components/useValidation";

export default function ModalPrescriptionPatients({
  flUpId,
  patientId,
  mutatePrescription,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [activeRow, setActiveRow] = React.useState<number | null>(null);
  const [valueDateExam, setValueDateExam] = React.useState<Dayjs | null>();
  const [valueSearch, setValueSearch] = React.useState("");
  const [note, setNote] = React.useState("");
  const [errors, setErrors] = React.useState<ValidationErrorsPrescriptions>();
  const { prescriptionSchema } = useValidation();
  const { dateReExamDefault, dateReExamDefaultDMY } =
    useGetDateReExamDefault(5);
  const { data } = useSearchMedicineOfPrescription({
    keyword: valueSearch,
  });
  const examtDate = valueDateExam?.format("DD-MM-YYYY").toString();

  const [medicinal, setMedicinal] = React.useState([
    {
      id: 1,
      name: "",
      numberOfDays: "",
      morning: "",
      afternoon: "",
      night: "",
      idMedication: "",
    },
  ]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { handleSaveInfoPrescriptionPatient } = useHandleAddPrescription({
    mutate: mutatePrescription,
    handleClose: handleClose,
  });
  const addFields = () => {
    const newId = medicinal.length + 1;
    setMedicinal([
      ...medicinal,
      {
        id: newId,
        name: "",
        morning: "",
        afternoon: "",
        night: "",
        numberOfDays: "",
        idMedication: "",
      },
    ]);
  };
  const removeField = (id: number) => {
    setMedicinal((prev) => prev.filter((field) => field.id !== id));
  };
  const handleReloadField = () => {
    setMedicinal([
      {
        id: 1,
        name: "",
        morning: "",
        afternoon: "",
        night: "",
        numberOfDays: "",
        idMedication: "",
      },
    ]);
  };
  const handleChangeValue = (
    id: number,
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setMedicinal((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, [name]: value } : field
      )
    );
    if (name === "name") {
      setValueSearch(value);
      setActiveRow(id);
    }
  };
  const handleNotePrescriptions = (value: string) => {
    setNote(value);
  };

  const handleSavePrescription = async () => {
    try {
      await prescriptionSchema.validate(
        { products: medicinal },
        { abortEarly: false }
      );
      handleSaveInfoPrescriptionPatient({
        patientId: patientId || "",
        followUpId: flUpId || "",
        notes: note ? note : "Không",
        revisitDate: examtDate || dateReExamDefaultDMY,
        products: medicinal.map((med) => ({
          medicineId: med.idMedication,
          instructions: {
            numberOfDays: med.numberOfDays || "0",
            day: med.morning || "0",
            lunch: med.afternoon || "0",
            afternoon: med.night || "0",
          },
        })),
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        const validationErrors: ValidationErrorsPrescriptions = {
          products: medicinal.map((_, index) => ({
            name:
              error.inner.find((err) => err.path === `products[${index}].name`)
                ?.message || "",
            numberOfDays:
              error.inner.find(
                (err) => err.path === `products[${index}].numberOfDays`
              )?.message || "",
          })),
        };
        setErrors(validationErrors); // Cập nhật lỗi vào trạng thái
      }
    }
  };

  const handleSaveDataMedication = (
    id: number,
    name: string,
    idMedication: string
  ) => {
    setMedicinal((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, name, idMedication } : field
      )
    );
    setValueSearch("");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resultSearchMedication = (id: number, attrs: any) => (
    <div
      className="w-[900px] p-2 bg-white shadow-lg shadow-slate-300 border-primary border-2 rounded-md overflow-hidden"
      {...attrs}
    >
      <div>
        <div className="grid grid-cols-5 border-b-2 border-gray-400 py-2">
          <span className="col-span-1 text-center text-xl">Tên</span>
          <span className="col-span-1 text-center text-xl">Biệt dược</span>
          <span className="col-span-1 text-center text-xl">Công ty</span>
          <span className="col-span-1 text-center text-xl">Kho</span>
          <span className="col-span-1 text-center text-xl">Hàm lượng</span>
        </div>
        <div className="max-h-52 overflow-hidden hidden-scrollbar overflow-y-auto">
          {data?.medicines.map((item) => {
            return (
              <div key={item.id}>
                <div>
                  <div
                    onClick={() =>
                      handleSaveDataMedication(id, item.name, item.id)
                    }
                    key={item.id}
                    className="w-full group py-2 "
                  >
                    <div className="grid grid-cols-5 hover:bg-gray-300 rounded-md py-1 cursor-pointer relative">
                      <span className="col-span-1 text-center text-xl truncate ">
                        {item.name}
                      </span>
                      <span className="col-span-1 text-center text-xl truncate ">
                        {item.specialty}
                      </span>
                      <span className="col-span-1 text-center text-xl truncate ">
                        {item.company}
                      </span>
                      <span className="col-span-1 text-center text-xl truncate ">
                        {item.stock}
                      </span>
                      <span className="col-span-1 text-center text-xl truncate ">
                        {item.nutritional}
                      </span>
                      {/* <div className="grid grid-cols-4 hover:bg-slate-200 rounded-md px-2 py-1 cursor-pointer"></div> */}
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-green-600 font-extrabold hidden group-hover:block"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        Kê toa
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="sticky flex justify-between mb-4 pb-3 border-b-2 border-primary-300">
            <div className="w-[200px]"></div>
            <div className="w-[200px]">
              <h2 className="text-4xl font-bold text-center mb-4">
                Kê Toa Thuốc
              </h2>
            </div>
            <div className="w-[200px] text-right">
              <Button
                style={{ height: "40px" }}
                variant="contained"
                color="error"
                onClick={handleClose}
              >
                X
              </Button>
            </div>
          </div>
          <div className="h-[320px] overflow-hidden overflow-y-auto hidden-scrollbar">
            {medicinal.map((field, index) => (
              <div key={index} className="flex">
                <div className="w-full grid grid-cols-5 py-2 ">
                  <div className="col-span-1 py-1">
                    <Tippy
                      visible={
                        !!valueSearch && !!data && activeRow === field.id
                      }
                      render={(attrs) =>
                        valueSearch.length > 0 &&
                        data &&
                        resultSearchMedication(field.id, attrs)
                      }
                      interactive
                      offset={[350, 10]}
                      placement="bottom"
                    >
                      <TextField
                        label="Tên thuốc"
                        variant="outlined"
                        className="w-full"
                        autoComplete="off"
                        name="name"
                        value={field.name}
                        onChange={(e) => handleChangeValue(field.id, e)}
                        error={!!errors?.products?.[index]?.name}
                        helperText={errors?.products?.[index]?.name}
                        onFocus={() => setErrors(undefined)}
                      />
                    </Tippy>
                  </div>
                  <div className="col-span-4 grid grid-cols-4 gap-1 py-1 px-2">
                    <TextField
                      label="Tổng số ngày"
                      variant="outlined"
                      name="numberOfDays"
                      className="w-full col-span-1"
                      value={field.numberOfDays}
                      onChange={(e) => handleChangeValue(field.id, e)}
                      error={!!errors?.products?.[index]?.numberOfDays}
                      helperText={errors?.products?.[index]?.numberOfDays}
                      onFocus={() => setErrors(undefined)}
                    />
                    <TextField
                      label="Sáng"
                      variant="outlined"
                      name="morning"
                      className="w-full col-span-1"
                      value={field.morning}
                      onChange={(e) => handleChangeValue(field.id, e)}
                    />
                    <TextField
                      label="Trưa"
                      variant="outlined"
                      name="afternoon"
                      className="w-full col-span-1"
                      value={field.afternoon}
                      onChange={(e) => handleChangeValue(field.id, e)}
                    />
                    <div className="col-span-1 flex">
                      <TextField
                        label="Chiều"
                        variant="outlined"
                        name="night"
                        className="w-full "
                        value={field.night}
                        onChange={(e) => handleChangeValue(field.id, e)}
                      />
                      <div className="flex items-center justify-center">
                        <button
                          color="error"
                          className="flex items-center justify-center border-2 border-red-500 w-8 h-8 rounded-full text-red-600 font-bold ml-4"
                          onClick={() => removeField(field.id)}
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mb-4 pb-3 border-t-2 border-gray-300">
            <div className="flex items-center pt-4 mb-2">
              <span className="text-xl font-bold text-black mr-3 w-36">
                Ngày tái khám:
              </span>
              <DatePicker
                label="Ngày tái khám"
                defaultValue={dayjs(dateReExamDefault)}
                value={valueDateExam}
                onChange={(newValue) => setValueDateExam(newValue)}
              />
            </div>
            <div className="flex items-center mb-2">
              <label className="w-36 text-xl font-bold text-black mr-3">
                Lời dặn bác sĩ:
              </label>
              <TextField
                onChange={(e) => handleNotePrescriptions(e.target.value)}
                placeholder="Nhập lời dặn của bác sĩ..."
                size="small"
                value={note}
                className="w-[85%] ml-3"
              />
            </div>
            <div className="flex justify-between items-center pt-3">
              <div>
                <Button
                  style={{ height: "40px", marginRight: "12px" }}
                  variant="contained"
                  color="warning"
                  onClick={addFields}
                >
                  Thêm hàng
                </Button>
                <Button
                  onClick={handleSavePrescription}
                  style={{ height: "40px" }}
                  variant="contained"
                >
                  Lưu
                </Button>
              </div>
              <div className="flex items-center">
                <Button
                  onClick={handleReloadField}
                  style={{
                    height: "40px",
                    marginRight: "12px",
                    borderColor: "black",
                    borderWidth: "10px",
                  }}
                  variant="contained"
                  color="success"
                >
                  <FontAwesomeIcon icon={faRotateRight} />
                </Button>
                <span className="text-2xl">
                  Cập nhật: {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
