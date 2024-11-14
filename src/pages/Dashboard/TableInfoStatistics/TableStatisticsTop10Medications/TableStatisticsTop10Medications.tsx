import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MedicationData } from "../../../../types";

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
  data: MedicationData;
}
export default function TableStatisticsTop10Medications({ data }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell width={"20%"} align="center">
              Tên
            </StyledTableCell>
            <StyledTableCell width={"20%"} align="center">
              Tên công ty
            </StyledTableCell>
            <StyledTableCell width={"20%"} align="center">
              Số lượng
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.medicines.map((item) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell
                width={"20%"}
                align="center"
                component="th"
                scope="row"
              >
                {item.name}
              </StyledTableCell>
              <StyledTableCell width={"20%"} align="center">
                {item.company}
              </StyledTableCell>
              <StyledTableCell width={"20%"} align="center">
                {item.amount}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
