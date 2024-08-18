import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ModalDeleteMedication from "../ModalDeleteMedication/ModalDeleteMedication";
import ModalUpdateMedication from "../ModalUpdateMedication/ModalUpdateMedication";
import { Medication } from "../../../types";

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
  data: Medication[];
  mutate: () => void;
}
export default function TableMedication({ data, mutate }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell width={"5%"} align="left">
              ID
            </StyledTableCell>
            <StyledTableCell width={"20%"} align="center">
              Tên
            </StyledTableCell>
            <StyledTableCell width={"20%"} align="center">
              Tên công ty
            </StyledTableCell>
            <StyledTableCell width={"10%"} align="center">
              Số lượng
            </StyledTableCell>
            <StyledTableCell width={"15%"} align="center">
              Giá
            </StyledTableCell>
            <StyledTableCell width={"15%"} align="center">
              Tình trạng
            </StyledTableCell>
            <StyledTableCell width={"15%"} align="center">
              Hành động
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <StyledTableRow key={item.name}>
              <StyledTableCell
                width={"5%"}
                align="left"
                component="th"
                scope="row"
              >
                {item.id}
              </StyledTableCell>
              <StyledTableCell width={"20%"} align="center">
                {item.name}
              </StyledTableCell>
              <StyledTableCell width={"20%"} align="center">
                {item.company}
              </StyledTableCell>
              <StyledTableCell width={"15%"} align="center">
                {item.price}
              </StyledTableCell>
              <StyledTableCell width={"10%"} align="center">
                {item.quantity}
              </StyledTableCell>
              <StyledTableCell width={"15%"} align="center">
                {item.status}
              </StyledTableCell>
              <StyledTableCell width={"15%"} align="right">
                <div className="flex justify-center">
                  <div className="mr-3">
                    <ModalDeleteMedication data={item} mutate={mutate} />
                  </div>
                  <div className="">
                    <ModalUpdateMedication data={item} mutate={mutate} />
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
