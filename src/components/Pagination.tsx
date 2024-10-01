// PaginationClinic.tsx
import React from "react";
import Pagination from "@mui/material/Pagination";

interface PaginationClinicProps {
  onChange?: (_event: React.ChangeEvent<unknown>, value: number) => void;
  count: number;
  page: number;
}

const PaginationClinic: React.FC<PaginationClinicProps> = ({
  onChange,
  count,
  page,
}) => {
  return (
    <Pagination count={count} page={page} onChange={onChange} color="primary" />
  );
};

export default PaginationClinic;
