import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import "tippy.js/dist/tippy.css";
import Tippy from "@tippyjs/react/headless";
import useSearchMedication from "../../../api/hooks/useSearchMedication";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCheck,
  faRotateRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import useHandleAddPrescription from "../hooks/useHandleAddPrescription";
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
  flUpId?: string;
  patientId?: string;
  mutatePrescription: () => void;
}

import useValidation, {
  ValidationErrorsPrescriptions,
} from "../../../hooks/components/useValidation";
import { ValidationError } from "yup";

export default function ModalPrescriptionPatients({
  flUpId,
  patientId,
  mutatePrescription,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [activeRow, setActiveRow] = React.useState<number | null>(null);
  const [valueSearch, setValueSearch] = React.useState("");
  const [note, setNote] = React.useState("");
  const [errors, setErrors] = React.useState<ValidationErrorsPrescriptions>({});
  const { prescriptionSchema } = useValidation();

  const { data, isLoading } = useSearchMedication({
    name: valueSearch,
    limit: 5,
    page: 1,
  });
  const [medicinal, setMedicinal] = React.useState([
    {
      id: 1,
      name: "",
      quantity: "",
      morning: "",
      afternoon: "",
      night: "",
      time: "Trước khi ăn",
      idMedication: "",
    },
  ]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { handleSaveInfoPatient } = useHandleAddPrescription({
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
        quantity: "",
        morning: "",
        afternoon: "",
        night: "",
        time: "Trước khi ăn",
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
        quantity: "",
        morning: "",
        afternoon: "",
        night: "",
        time: "",
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
      for (const med of medicinal) {
        await prescriptionSchema.validate(med, { abortEarly: false });
      }
      handleSaveInfoPatient({
        followUpId: flUpId || "",
        patientId: patientId || "",
        notes: note ? note : "Không",
        products: medicinal.map((med) => ({
          medicineId: med.idMedication,
          quantity: Number(med.quantity),
          instructions: {
            day: med.morning || "",
            lunch: med.afternoon || "",
            afternoon: med.night || "",
            manual: med.time || "",
          },
        })),
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
      className="w-[150px]  p-2 bg-white shadow-lg shadow-slate-300 border-primary border-2 rounded-md overflow-hidden"
      {...attrs}
    >
      {data?.medicines.map((item) => {
        return (
          <div key={item.id}>
            {isLoading ? (
              <Spinner />
            ) : (
              <div
                onClick={() => handleSaveDataMedication(id, item.name, item.id)}
                key={item.id}
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
            {medicinal.map((field, index) => (
              <div key={index} className="flex">
                <div className="w-full grid grid-cols-5 py-2 ">
                  <div className="col-span-1 py-1">
                    <Tippy
                      trigger="click"
                      visible={
                        !!valueSearch && !!data && activeRow === field.id
                      }
                      render={(attrs) =>
                        valueSearch.length > 0 &&
                        data &&
                        resultSearchMedication(field.id, attrs)
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
                        onChange={(e) => handleChangeValue(field.id, e)}
                        error={!!errors.name} // Kiểm tra nếu có lỗi
                        helperText={errors.name}
                        onFocus={() =>
                          setErrors((prev) => ({ ...prev, name: undefined }))
                        }
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
                      onChange={(e) => handleChangeValue(field.id, e)}
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
                    <TextField
                      label="Chiều"
                      variant="outlined"
                      name="night"
                      className="w-full col-span-1"
                      value={field.night}
                      onChange={(e) => handleChangeValue(field.id, e)}
                    />
                  </div>
                  <div className="col-span-1">
                    <div className="flex justify-center items-center h-14">
                      <select
                        name="time"
                        className="text-xl text-center outline-none h-14 w-full mt-2 border-2 rounded-md block"
                        id="time"
                        value={field.time}
                        onChange={(e) => handleChangeValue(field.id, e)}
                      >
                        <option value="Trước khi ăn">Trước khi ăn</option>
                        <option value="Sau khi ăn">Sau khi ăn</option>
                      </select>
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