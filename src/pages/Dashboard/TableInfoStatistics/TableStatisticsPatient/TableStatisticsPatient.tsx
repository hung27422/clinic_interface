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
export default function TableStatisticsPatient({ data }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell width={"20%"} align="center">
              Tên
            </StyledTableCell>
            <StyledTableCell width={"20%"} align="center">
              Tuổi
            </StyledTableCell>
            <StyledTableCell width={"20%"} align="center">
              Số điện thoại
            </StyledTableCell>
            <StyledTableCell width={"40%"} align="center">
              Địa chỉ
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.patients.map((item) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell width={"20%"} align="center">
                {item.name}
              </StyledTableCell>
              <StyledTableCell width={"20%"} align="center">
                {item.age}
              </StyledTableCell>
              <StyledTableCell width={"20%"} align="center">
                {item.phoneNumber}
              </StyledTableCell>
              <StyledTableCell width={"40%"} align="center">
                {item.address}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
