import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { PatientDataTemp } from "../../../../types";

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

interface Props {
  data: PatientDataTemp;
}
export default function TableStatisticsPatientExamined({ data }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Tên</StyledTableCell>
            <StyledTableCell align="center">Tuổi</StyledTableCell>
            <StyledTableCell align="center">Số điện thoại</StyledTableCell>
            <StyledTableCell align="center">Địa chỉ</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.patients.map((item) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell align="center">{item.name}</StyledTableCell>
              <StyledTableCell align="center">{item.age}</StyledTableCell>
              <StyledTableCell align="center">
                {item.phoneNumber}
              </StyledTableCell>
              <StyledTableCell align="center">{item.address}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
