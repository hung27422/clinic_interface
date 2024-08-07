import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import config from "../../../configs/configs";
import { Button } from "@mui/material";
import ModalDeletePatient from "../ModalDeletePatient/ModalDeletePatient";
import ModalUpdatePatient from "../ModalUpdatePatient/ModalUpdatePatient";

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
    id: 1,
    name: "Phi Nguyễn",
    age: 22,
    address: "828 Sư Vạn Hạnh",
    phone: "123456789",
  },
  { id: 3, name: "Phúc Lưu", age: 22, address: "Quận 10", phone: "123456789" },
  { id: 4, name: "Hải Phạm", age: 22, address: "Tân Bình", phone: "123456789" },
  {
    id: 5,
    name: "Thanh Sang",
    age: 22,
    address: "Bình Tân",
    phone: "123456789",
  },
  { id: 6, name: "Tấn Hùng", age: 22, address: "Thủ Đức", phone: "123456789" },
  { id: 7, name: "Phúc Lưu", age: 22, address: "Quận 10", phone: "123456789" },
];

export default function TablePatient() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell width={"5%"} align="left">
              ID
            </StyledTableCell>
            <StyledTableCell width={"10%"} align="center">
              Tên
            </StyledTableCell>
            <StyledTableCell width={"10%"} align="center">
              Tuổi
            </StyledTableCell>
            <StyledTableCell width={"15%"} align="center">
              Số điện thoại
            </StyledTableCell>
            <StyledTableCell width={"25%"} align="center">
              Địa chỉ
            </StyledTableCell>
            <StyledTableCell width={"25%"} align="center">
              Xem thông tin
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {infoPatients.map((item) => (
            <StyledTableRow key={item.name}>
              <StyledTableCell
                width={"5%"}
                align="left"
                component="th"
                scope="row"
              >
                {item.id}
              </StyledTableCell>
              <StyledTableCell width={"10%"} align="center">
                {item.name}
              </StyledTableCell>
              <StyledTableCell width={"10%"} align="center">
                {item.age}
              </StyledTableCell>
              <StyledTableCell width={"15%"} align="center">
                {item.phone}
              </StyledTableCell>
              <StyledTableCell width={"25%"} align="center">
                {item.address}
              </StyledTableCell>
              <StyledTableCell width={"25%"} align="center">
                <div className="flex justify-center">
                  <div className="mr-2">
                    <Link to={`${config.router.viewpatient}123`}>
                      <Button variant="contained">Thông tin</Button>
                    </Link>
                  </div>
                  <div className="mr-2">
                    <ModalDeletePatient />
                  </div>
                  <div>
                    <ModalUpdatePatient />
                  </div>
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
