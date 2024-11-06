import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Patient, PrescriptionData } from "../../../types";
import axios from "axios";
import useToastify from "../../../hooks/Toastify/useToastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #1b9fc9",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};
interface Props {
  dataPatient?: Patient;
  summary: string;
  mutatePrescription: () => void;
  idPrescription: string;
  dataPrescription: PrescriptionData;
}
export default function ModalDeletePrescription({
  dataPatient,
  summary,
  mutatePrescription,
  idPrescription,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //   Thông báo xóa thông tin bệnh nhân nếu thành công
  const { notify } = useToastify({
    title: `Xóa thông tin khám bênh của ${dataPatient?.name} thành công`,
    type: "success",
  });

  // Hàm xóa fl up
  const handleDeleteInfoExamination = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      await axios.delete(`${apiUrl}/Prescription/${idPrescription}`);
      mutatePrescription();
      handleClose();
      notify();
    } catch (err) {
      console.log("Lỗi", err);
    }
  };
  return (
    <div>
      <button
        onClick={handleOpen}
        className="w-10 h-10 hover:bg-gray-300 rounded-full hover:border-2 hover:border-red-400"
      >
        <FontAwesomeIcon
          className="font-bold text-red-500 text-xl"
          icon={faTrash}
        />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <span className="text-2xl">
              Bạn có chắn chắn muốn xóa thông tin toa thuốc của bệnh nhân
              <span className="text-red-500 font-semibold">
                {" " + dataPatient?.name + ". "}
              </span>
              <br />
              Được chuẩn đoán là:
              <span className="text-red-500 font-semibold">
                {" " + summary}
              </span>
            </span>
            <div className="mt-3 ml-auto mr-auto w-full text-center">
              <Button
                onClick={handleDeleteInfoExamination}
                style={{ marginRight: "2px" }}
                variant="contained"
              >
                Đồng ý
              </Button>
              <Button
                style={{ marginLeft: "2px" }}
                className="ml-2"
                variant="contained"
                color="error"
                onClick={handleClose}
              >
                Hủy
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
