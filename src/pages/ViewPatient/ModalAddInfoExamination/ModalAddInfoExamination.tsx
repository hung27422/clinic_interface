import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import InfoPatient from "../InfoPatient/InfoPatient";
import { Patient } from "../../../types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #1b9fc9",
  boxShadow: 24,
  p: 4,
  borderRadius: 6,
};
interface Props {
  idPatient?: string;
  dataPatient: Patient;
  mutate: () => void; //Muate bệnh nhân
  mutateFollowUp: () => void;
}
export default function ModalAddInfoExamination({
  idPatient,
  dataPatient,
  mutate,
  mutateFollowUp,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="primary">
        Thêm bệnh mới
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <InfoPatient
            idPatient={idPatient}
            dataPatient={dataPatient}
            mutate={mutate}
            mutateFollowUp={mutateFollowUp}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
    </div>
  );
}
