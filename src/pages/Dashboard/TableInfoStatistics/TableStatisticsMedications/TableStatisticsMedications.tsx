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

const infoMedications = [
  {
    id: 1,
    name: "Socola kẹo mút",
    company: "Socola",
    price: "2000",
    quantity: "100",
    status: "Còn",
  },
  {
    id: 2,
    name: "Kẹo bạc hà",
    company: "Candy",
    price: "2000",
    quantity: "100",
    status: "Còn",
  },
  {
    id: 3,
    name: "Kẹo dâu",
    company: "Candy",
    price: "2000",
    quantity: "100",
    status: "Còn",
  },
  {
    id: 4,
    name: "Socola kẹo mút",
    company: "Socola",
    price: "2000",
    quantity: "100",
    status: "Còn",
  },
  {
    id: 5,
    name: "Socola kẹo mút",
    company: "Socola",
    price: "2000",
    quantity: "100",
    status: "Còn",
  },
  {
    id: 6,
    name: "Socola kẹo mút",
    company: "Socola",
    price: "2000",
    quantity: "100",
    status: "Còn",
  },
];

export default function TableStatisticsMedications() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell width={"5%"} align="left">
              Id
            </StyledTableCell>
            <StyledTableCell width={"15%"} align="center">
              Tên
            </StyledTableCell>
            <StyledTableCell width={"20%"} align="center">
              Tên công ty
            </StyledTableCell>
            <StyledTableCell width={"20%"} align="center">
              Số lượng
            </StyledTableCell>
            <StyledTableCell width={"20%"} align="center">
              Giá
            </StyledTableCell>
            <StyledTableCell width={"20%"} align="center">
              Tình trạng
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {infoMedications.map((item) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell
                width={"5%"}
                align="left"
                component="th"
                scope="row"
              >
                {item.id}
              </StyledTableCell>
              <StyledTableCell width={"15%"} align="center">
                {item.name}
              </StyledTableCell>
              <StyledTableCell width={"20%"} align="center">
                {item.company}
              </StyledTableCell>
              <StyledTableCell width={"20%"} align="center">
                {item.price}
              </StyledTableCell>
              <StyledTableCell width={"20%"} align="center">
                {item.quantity}
              </StyledTableCell>
              <StyledTableCell width={"20%"} align="center">
                {item.status}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
