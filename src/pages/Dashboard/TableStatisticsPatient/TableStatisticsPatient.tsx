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

const infoPatients = [
  {
    name: "Phi Nguyễn",
    age: 22,
    address: "828 Sư Vạn Hạnh",
    phone: "123456789",
  },
  { name: "Hải Phạm", age: 22, address: "Tân Bình", phone: "123456789" },
  { name: "Phúc Lưu", age: 22, address: "Quận 10", phone: "123456789" },
  { name: "Thanh Sang", age: 22, address: "Bình Tân", phone: "123456789" },
  { name: "Tấn Hùng", age: 22, address: "Thủ Đức", phone: "123456789" },
  { name: "Phúc Lưu", age: 22, address: "Quận 10", phone: "123456789" },
];

export default function TableStatisticsPatient() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell width={"20%"} align="left">
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
          {infoPatients.map((item) => (
            <StyledTableRow key={item.name}>
              <StyledTableCell
                width={"20%"}
                align="left"
                component="th"
                scope="row"
              >
                {item.name}
              </StyledTableCell>
              <StyledTableCell width={"20%"} align="center">
                {item.age}
              </StyledTableCell>
              <StyledTableCell width={"20%"} align="center">
                {item.phone}
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
