import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import "tippy.js/dist/tippy.css";
import Tippy from "@tippyjs/react/headless";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCheck } from "@fortawesome/free-solid-svg-icons";
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

import { Prescriptions } from "../../../types";
import useHandleUpdatePrescription from "./hooks/useHandleUpdatePrescription";
import useSearchMedicineOfPrescription from "../../../api/hooks/useSearchMedicineOfPrescription";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

import { ValidationError } from "yup";

import useValidation, {
  ValidationErrorsPrescriptionUpdate,
} from "../../../hooks/components/useValidation";
import { ClinicContext } from "../../../Context/ContextClinic";
import { useContext } from "react";
const convertDateFormat = (dateString: string): string => {
  const [year, month, day] = dateString.split("-");
  return `${month}-${day}-${year}`;
};
const convertDateFormatDMY = (dateString: string): string => {
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
};
interface Props {
  data: Prescriptions;
  mutatePrescription: () => void;
  mutatePrescriptionByFlowUp?: () => void;
}
export default function ModalUpdatePrescription({
  data,
  mutatePrescription,
  mutatePrescriptionByFlowUp = () => {},
}: Props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [activeRow, setActiveRow] = React.useState<number>(0);
  const [valueSearch, setValueSearch] = React.useState("");
  const [note, setNote] = React.useState("");
  const [valueDateExam, setValueDateExam] = React.useState<Dayjs | null>();
  const [errors, setErrors] =
    React.useState<ValidationErrorsPrescriptionUpdate>();
  const { prescriptionSchemaUpdate } = useValidation();
  const { errStock } = useContext(ClinicContext);

  const { handleUpdatePrescription } = useHandleUpdatePrescription({
    idPrescriptions: data.id,
    mutate: mutatePrescription,
    handleClose: handleClose,
    mutatePrescriptionByFlowUp: mutatePrescriptionByFlowUp,
  });
  const examtDate = valueDateExam?.format("DD-MM-YYYY").toString();

  const [medicinal, setMedicinal] = React.useState({
    products: [
      {
        medicineId: "",
        name: "",
        instructions: {
          numberOfDays: "",
          day: "",
          lunch: "",
          afternoon: "",
        },
      },
    ],
  });

  const handleChangeValue = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    rowIndex: number
  ) => {
    const { name, value } = e.target;

    setMedicinal((prev) => ({
      ...prev,
      products: prev.products.map((med, index) =>
        index === rowIndex
          ? {
              ...med,
              [name]: value,
              instructions: {
                ...med.instructions,
                ...(name === "numberOfDays" && { numberOfDays: value }),
                ...(name === "morning" && { day: value }),
                ...(name === "afternoon" && { lunch: value }),
                ...(name === "night" && { afternoon: value }),
              },
            }
          : med
      ),
    }));
    // Đặt `activeRow` thành hàng hiện tại
    setActiveRow(rowIndex);
  };

  React.useEffect(() => {
    if (data.products) {
      setMedicinal((prev) => ({
        ...prev,
        products: data.products.map((med) => ({
          medicineId: med.medicineId,
          name: med.name,
          instructions: {
            numberOfDays: med.instructions.numberOfDays || "",
            day: med.instructions.day || "",
            lunch: med.instructions.lunch || "",
            afternoon: med.instructions.afternoon || "",
          },
        })),
      }));
    }
  }, [data]);

  const { data: dataSearchMedicine } = useSearchMedicineOfPrescription({
    keyword: valueSearch,
    page: 1,
    limit: 15,
  });
  const handleNotePrescriptions = (value: string) => {
    setNote(value);
  };

  const handleSavePrescription = async () => {
    try {
      await prescriptionSchemaUpdate.validate(
        { products: medicinal.products },
        { abortEarly: false }
      );
      handleUpdatePrescription({
        id: data.id,
        products: medicinal.products.map((med) => ({
          medicineId: med.medicineId,
          name: med.name,
          instructions: {
            numberOfDays: med.instructions.numberOfDays || "0",
            day: med.instructions.day || "0",
            lunch: med.instructions.lunch || "0",
            afternoon: med.instructions.afternoon || "0",
          },
        })),
        revisitDate: examtDate || convertDateFormatDMY(data.revisit),
        notes: note || data.notes,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        const validationErrors: ValidationErrorsPrescriptionUpdate = {
          products: medicinal.products.map((_, index) => ({
            name:
              error.inner.find((err) => err.path === `products[${index}].name`)
                ?.message || "",
            instructions: {
              numberOfDays:
                error.inner.find(
                  (err) =>
                    err.path === `products[${index}].instructions.numberOfDays`
                )?.message || "",
            },
          })),
        };

        setErrors(validationErrors);
      }
    }
  };

  const handleSaveDataMedication = (name: string, idMedication: string) => {
    // Update only the active row with the selected medicine
    setMedicinal((prev) => ({
      ...prev,
      products: prev.products.map((field, index) =>
        index === activeRow
          ? { ...field, name: name, medicineId: idMedication }
          : field
      ),
    }));
    setValueSearch(""); // Clear the search field
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resultSearchMedication = (attrs: any) => (
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
          {dataSearchMedicine?.medicines.map((item, index) => {
            return (
              <div key={item.id}>
                <div
                  onClick={() => handleSaveDataMedication(item.name, item.id)}
                  key={index}
                  className="w-full group py-2"
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
            );
          })}
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="success">
        Sửa toa
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="sticky flex justify-between border-b-2 border-gray-500 py-1">
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
          <div className="h-[350px] mt-3 overflow-hidden overflow-y-auto hidden-scrollbar">
            {medicinal.products.map((field, index) => (
              <div key={index} className="flex">
                <div className="w-full grid grid-cols-5 py-2 ">
                  <div className="col-span-1 py-1">
                    <Tippy
                      visible={
                        activeRow === index &&
                        !!valueSearch &&
                        !!dataSearchMedicine?.medicines
                      }
                      render={(attrs) =>
                        valueSearch.length > 0 &&
                        data &&
                        resultSearchMedication(attrs)
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
                        onChange={(e) => {
                          handleChangeValue(e, index);
                          setValueSearch(e.target.value);
                          setActiveRow(index);
                        }}
                        error={
                          !!errors?.products?.[index]?.name ||
                          errStock === field.name
                        }
                        helperText={
                          errors?.products?.[index]?.name ||
                          (errStock === field.name &&
                            "SL tồn kho không đủ kê toa")
                        }
                        onFocus={() => setErrors(undefined)}
                      />
                    </Tippy>
                  </div>
                  <div className="col-span-4 grid grid-cols-4 gap-1 py-1 px-2">
                    <TextField
                      label="Tổng số ngày"
                      variant="outlined"
                      className="w-full"
                      autoComplete="off"
                      name="numberOfDays"
                      value={field.instructions.numberOfDays}
                      onChange={(e) => {
                        handleChangeValue(e, index);
                        setActiveRow(index);
                      }}
                      error={
                        !!errors?.products?.[index]?.instructions
                          .numberOfDays || errStock === field.name
                      }
                      helperText={
                        errors?.products?.[index]?.instructions.numberOfDays
                      }
                      onFocus={() => setErrors(undefined)}
                    />
                    <TextField
                      label="Sáng"
                      variant="outlined"
                      name="morning"
                      className="w-full col-span-1"
                      value={field.instructions.day}
                      onChange={(e) => {
                        handleChangeValue(e, index);
                        setActiveRow(index); // Set active row when user types
                      }}
                    />
                    <TextField
                      label="Trưa"
                      variant="outlined"
                      name="afternoon"
                      className="w-full col-span-1"
                      value={field.instructions.lunch}
                      onChange={(e) => {
                        handleChangeValue(e, index);
                        setActiveRow(index); // Set active row when user types
                      }}
                    />
                    <TextField
                      label="Chiều"
                      variant="outlined"
                      name="night"
                      className="w-full col-span-1"
                      value={field.instructions.afternoon}
                      onChange={(e) => {
                        handleChangeValue(e, index);
                        setActiveRow(index); // Set active row when user types
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="flex items-center pt-4 mb-2">
              <span className="text-xl font-bold text-black mr-3 w-36">
                Ngày tái khám:
              </span>
              <DatePicker
                label="Ngày tái khám"
                defaultValue={dayjs(convertDateFormat(data.revisit))}
                value={valueDateExam}
                onChange={(newValue) => setValueDateExam(newValue)}
              />
            </div>
            <div className="flex items-center mb-2">
              <label className="text-xl font-bold text-black mr-3">
                Lời dặn:
              </label>
              <TextField
                onChange={(e) => handleNotePrescriptions(e.target.value)}
                placeholder="Nhập lời dặn của bác sĩ..."
                size="small"
                value={note}
                className="w-[90%] ml-3"
              />
            </div>
            <div className="flex justify-between items-center pt-3">
              <div>
                <Button
                  onClick={handleSavePrescription}
                  style={{ height: "40px" }}
                  variant="contained"
                >
                  Lưu
                </Button>
              </div>
              <div className="flex items-center">
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
