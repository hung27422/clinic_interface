import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Medication } from "../../../types";
import axios from "axios";
import useToastify from "../../../hooks/Toastify/useToastify";
import { ClinicContext } from "../../../Context/ContextClinic";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  border: "2px solid #1b9fc9",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};
interface Props {
  data: Medication;
  mutate: () => void;
}
export default function ModalDeleteMedication({ data, mutate }: Props) {
  const { setKeyReloadMedicineByDate, setKeyReloadMedicineTop10 } =
    React.useContext(ClinicContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { notify } = useToastify({
    title: `Xóa thuốc ${data.name} thành công`,
    type: "success",
  });
  const handleDeleteMedication = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      await axios.delete(`${apiUrl}/Medicine/${data.id}`);
      mutate();
      handleClose();
      notify();
      setKeyReloadMedicineTop10((prev) => prev + 1);
      setKeyReloadMedicineByDate((prev) => prev + 1);
    } catch (err) {
      console.log("Lỗi", err);
    }
  };
  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="error">
        Xóa
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="text-center">
            <h2 className="text-3xl">
              Bạn chắc chắc muốn xóa thuốc có tên
              <span className="text-red-600"> {data.name}</span>
            </h2>

            <div className="mt-4">
              <Button
                onClick={handleDeleteMedication}
                variant="contained"
                style={{ marginRight: "12px" }}
              >
                Đồng ý
              </Button>
              <Button onClick={handleClose} variant="contained" color="error">
                Hủy
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
