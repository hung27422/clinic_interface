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
import { Medication, MedicationData } from "../../../types";

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
  mutate: () => void;
}
export default function TableMedication({ data, mutate }: Props) {
  const dataExit = data.medicines && data.medicines.length > 0;
  return (
    <>
      {dataExit ? (
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
                <StyledTableCell width={"10%"} align="center">
                  Giá
                </StyledTableCell>
                <StyledTableCell width={"15%"} align="center">
                  Số lượng tồn kho
                </StyledTableCell>
                <StyledTableCell width={"15%"} align="center">
                  Loại
                </StyledTableCell>
                <StyledTableCell width={"15%"} align="center">
                  Hành động
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.medicines?.map((item: Medication) => (
                <StyledTableRow key={item.name}>
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
                    {item.stock}
                  </StyledTableCell>
                  <StyledTableCell width={"15%"} align="center">
                    {item.type}
                  </StyledTableCell>
                  <StyledTableCell width={"20%"} align="right">
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
      ) : (
        <div className="mt-10 flex items-center justify-center">
          <span className="text-4xl text-red-500">
            Hiện tại danh sách thuốc đang trống. Vui lòng thêm thuốc
          </span>
        </div>
      )}
    </>
  );
}
