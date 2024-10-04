import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FollowUp, FollowUpData, Patient } from "../../../types";
import axios from "axios";
import useHandleUpdatePatient from "../../Patient/ModalUpdatePatient/hook/useHandleUpdatePatient";
import useToastify from "../../../hooks/Toastify/useToastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
interface Props {
  dataPatient?: Patient;
  dataFollowUp?: FollowUpData;
  mutate: () => void;
  mutateFollowUp: () => void;
}
export default function DeleteInfoExamination({
  dataPatient,
  dataFollowUp,
  mutate,
  mutateFollowUp,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const { handleUpdateInfoPatient } = useHandleUpdatePatient({
    id: dataPatient?.id ?? "",
    mutate: mutate,
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //   Thông báo xóa thông tin bệnh nhân nếu thành công
  const { notify } = useToastify({
    title: `Xóa thông tin bệnh nhân ${dataPatient?.name} thành công`,
    type: "success",
  });
  //   Lấy id của fl up
  const idFollowUp =
    dataFollowUp?.followUp.map((item: FollowUp) => {
      return item.id;
    }) ?? [];
  //Sau khi xóa update lại checkstatus của bệnh nhân lại bệnh nhân
  const handleUpdateCheckStatusPatient = () => {
    //Định dạng lại ngày dd/mm/yyyy
    const formattedDate = dataPatient?.dob.split("-").reverse().join("-");
    handleUpdateInfoPatient({
      id: dataPatient?.id || "",
      name: dataPatient?.name || "",
      address: dataPatient?.address || "",
      phoneNumber: dataPatient?.phoneNumber || "",
      dob: formattedDate || "",
      checkStatus: "not_examined",
    });
  };
  // Hàm xóa fl up
  const handleDeleteInfoExamination = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      await axios.delete(`${apiUrl}/FollowUp/${idFollowUp[0]}`);
      //Sau khi xóa update lại checkstatus của bệnh nhân lại bệnh nhân
      handleUpdateCheckStatusPatient();
      mutateFollowUp();
      handleClose();
      notify();
    } catch (err) {
      console.log("Lỗi", err);
    }
  };
  return (
    <div>
      <Button
        style={{ backgroundColor: "red", color: "white", height: "44px" }}
        onClick={handleOpen}
      >
        Xóa thông tin khám
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <span className="text-2xl">
              Bạn có chắn chắn muốn xóa thông tin của bệnh nhân
              <span className="text-red-500 font-semibold">
                {" " + dataPatient?.name}
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
