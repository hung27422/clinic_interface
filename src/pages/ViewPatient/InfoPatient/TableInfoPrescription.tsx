import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const InfoPrescriptions = [
  {
    id: 1,
    name: "Kẹo",
    quantity: 2,
    numberDate: 2,
  },
  { id: 2, name: "Kem", quantity: 2, numberDate: 2 },
  { id: 3, name: "Bánh", quantity: 3, numberDate: 3 },
  {
    id: 1,
    name: "Kẹo",
    quantity: 2,
    numberDate: 2,
  },
  { id: 2, name: "Kem", quantity: 2, numberDate: 2 },
  { id: 3, name: "Bánh", quantity: 3, numberDate: 3 },
  {
    id: 1,
    name: "Kẹo",
    quantity: 2,
    numberDate: 2,
  },
  { id: 2, name: "Kem", quantity: 2, numberDate: 2 },
  { id: 3, name: "Bánh", quantity: 3, numberDate: 3 },
];

export default function TableInfoPrescription() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Tên thuốc</StyledTableCell>
            <StyledTableCell align="center">Số lượng</StyledTableCell>
            <StyledTableCell align="center">Số ngày dùng</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {InfoPrescriptions.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="center" component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.quantity}</StyledTableCell>
              <StyledTableCell align="center">{row.numberDate}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
