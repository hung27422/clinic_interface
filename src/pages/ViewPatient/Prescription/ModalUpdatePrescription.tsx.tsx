import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import "tippy.js/dist/tippy.css";
import Tippy from "@tippyjs/react/headless";
import useSearchMedication from "../../../api/hooks/useSearchMedication";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../../hooks/Spinner/Spinner";
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
  data: Prescriptions;
  mutatePrescription: () => void;
}

import useValidation, {
  ValidationErrorsPrescriptions,
} from "../../../hooks/components/useValidation";
import { ValidationError } from "yup";
import { Prescriptions } from "../../../types";
import useHandleUpdatePrescription from "./hooks/useHandleUpdatePrescription";

export default function ModalUpdatePrescription({
  data,
  mutatePrescription,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [activeRow, setActiveRow] = React.useState<number>(0);
  const [valueSearch, setValueSearch] = React.useState("");
  const [note, setNote] = React.useState("");
  const [errors, setErrors] = React.useState<ValidationErrorsPrescriptions>({});
  const { prescriptionSchema } = useValidation();
  const { handleUpdatePrescription } = useHandleUpdatePrescription({
    idPrescriptions: data.id,
    mutate: mutatePrescription,
    handleClose: handleClose,
  });
  const [medicinal, setMedicinal] = React.useState({
    id: "",
    medicines: [
      {
        medicineId: "",
        name: "",
        quantity: "",
        instructions: {
          day: "",
          lunch: "",
          afternoon: "",
          manual: "",
        },
      },
    ],
    notes: "",
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
      medicines: prev.medicines.map((med, index) =>
        index === rowIndex
          ? {
              ...med,
              // Cập nhật giá trị của trường `name` mà bạn đang nhập
              [name]: value,
              instructions: {
                ...med.instructions,
                ...(name === "morning" && { day: value }),
                ...(name === "afternoon" && { lunch: value }),
                ...(name === "night" && { afternoon: value }),
                ...(name === "time" && { manual: value }),
              },
            }
          : med
      ),
    }));
    // Đặt `activeRow` thành hàng hiện tại
    setActiveRow(rowIndex);
  };

  // In your useEffect:
  React.useEffect(() => {
    if (data.products) {
      setMedicinal((prev) => ({
        ...prev,
        medicines: data.products.map((med) => ({
          medicineId: med.medicineId, // Ensure you have the correct id from data
          name: med.name,
          quantity: med.quantity.toString(), // Convert quantity to string if needed
          instructions: {
            day: med.instructions.day || "",
            lunch: med.instructions.lunch || "",
            afternoon: med.instructions.afternoon || "",
            manual: med.instructions.manual || "",
          },
        })),
        notes: prev.notes, // Keep existing notes or reset as needed
      }));
    }
  }, [data.products]);
  console.log(medicinal);

  const { data: dataSearchMedicine, isLoading } = useSearchMedication({
    name: valueSearch,
    limit: 5,
    page: 1,
  });
  const handleNotePrescriptions = (value: string) => {
    setNote(value);
  };

  const handleSavePrescription = async () => {
    try {
      for (const med of medicinal.medicines) {
        await prescriptionSchema.validate(med, { abortEarly: false });
      }
      handleUpdatePrescription({
        id: data.id,
        medicines: medicinal.medicines.map((med) => ({
          medicineId: med.medicineId,
          quantity: Number(med.quantity),
          instructions: {
            day: med.instructions.day || "",
            lunch: med.instructions.lunch || "",
            afternoon: med.instructions.afternoon || "",
            manual: med.instructions.manual || "",
          },
        })),
        notes: medicinal.notes,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        const validationErrors: ValidationErrorsPrescriptions = {};
        error.inner.forEach((err) => {
          validationErrors[err.path as keyof ValidationErrorsPrescriptions] =
            err.message;
        });
        setErrors(validationErrors);
      }
    }
  };

  const handleSaveDataMedication = (name: string, idMedication: string) => {
    // Update only the active row with the selected medicine
    setMedicinal((prev) => ({
      ...prev,
      medicines: prev.medicines.map((field, index) =>
        index === activeRow
          ? { ...field, name: name, medicineId: idMedication } // Update only the active row
          : field
      ),
    }));

    setValueSearch(""); // Clear the search field
    // setActiveRow(-1); // Optionally reset the active row
  };
  console.log(medicinal);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resultSearchMedication = (id: string, attrs: any) => (
    <div
      className="w-[150px]  p-2 bg-white shadow-lg shadow-slate-300 border-primary border-2 rounded-md overflow-hidden"
      {...attrs}
    >
      {dataSearchMedicine?.medicines.map((item, index) => {
        return (
          <div key={item.id}>
            {isLoading ? (
              <Spinner />
            ) : (
              <div
                onClick={() => handleSaveDataMedication(item.name, item.id)}
                key={index}
                className="w-full group"
              >
                <div className="flex items-center hover:bg-slate-200 rounded-md px-2 py-1 cursor-pointer">
                  <span className="w-full block text-xl truncate">
                    {item.name}
                  </span>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-green-600 font-extrabold hidden group-hover:block"
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
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
          <div className="sticky flex justify-between">
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
          <div className="grid grid-cols-4 mb-4 pb-3 border-b-2 border-gray-300">
            <span className="col-span-1 text-center font-bold text-xl">
              Tên thuốc
            </span>
            <span className="col-span-2 text-center font-bold text-xl">
              Cách uống thuốc
            </span>
            <span className="col-span-1 text-left font-bold text-xl ml-8">
              Thời gian uống thuốc
            </span>
          </div>
          <div className="h-[400px] overflow-hidden overflow-y-auto hidden-scrollbar">
            {medicinal.medicines.map((field, index) => (
              <div key={index} className="flex">
                <div className="w-full grid grid-cols-5 py-2 ">
                  <div className="col-span-1 py-1">
                    <Tippy
                      visible={
                        activeRow === index &&
                        !!valueSearch &&
                        !!dataSearchMedicine
                      }
                      render={(attrs) =>
                        valueSearch.length > 0 &&
                        data &&
                        resultSearchMedication(field.medicineId, attrs)
                      }
                      interactive
                      offset={[50, 10]}
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
                          setActiveRow(index); // Set active row when user types
                        }}
                        error={!!errors.name} // Kiểm tra nếu có lỗi
                        helperText={errors.name}
                        onFocus={() => {
                          setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                      />
                    </Tippy>
                  </div>
                  <div className="col-span-3 grid grid-cols-4 gap-1 py-1 px-2">
                    <TextField
                      label="Tổng số thuốc"
                      variant="outlined"
                      name="quantity"
                      className="w-full col-span-1"
                      value={field.quantity}
                      onChange={(e) => {
                        handleChangeValue(e, index);
                        setActiveRow(index); // Set active row when user types
                      }}
                      error={!!errors.quantity} // Kiểm tra nếu có lỗi
                      helperText={errors.quantity}
                      onFocus={() =>
                        setErrors((prev) => ({ ...prev, quantity: undefined }))
                      }
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
                  <div className="col-span-1">
                    <div className="flex justify-center items-center h-14">
                      <select
                        name="time"
                        className="text-xl text-center outline-none h-14 w-full mt-2 border-2 rounded-md block"
                        id="time"
                        value={field.instructions.manual}
                        onChange={(e) => {
                          handleChangeValue(e, index);
                          setActiveRow(index); // Set active row when user types
                        }}
                      >
                        <option value="Trước khi ăn">Trước khi ăn</option>
                        <option value="Sau khi ăn">Sau khi ăn</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
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
