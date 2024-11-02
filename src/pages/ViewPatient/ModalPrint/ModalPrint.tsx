import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import InfoPrescription from "../Prescription/InfoPrescription";
import { Prescriptions } from "../../../types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,

  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
interface Props {
  data: Prescriptions;
  titleFirst?: boolean;
}
export default function ModalPrint({ data, titleFirst }: Props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="primary">
        {titleFirst ? "Xem toa thuốc mới nhất" : "Xem và In"}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="h-[550px] overflow-hidden overflow-y-scroll hidden-scrollbar">
            <InfoPrescription data={data} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
