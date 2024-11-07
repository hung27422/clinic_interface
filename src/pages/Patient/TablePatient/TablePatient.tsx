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
import { Patient, PatientData } from "../../../types";
import { useContext, useEffect } from "react";
import { ClinicContext } from "../../../Context/ContextClinic";

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
  data: PatientData;
  mutate: () => void;
  page: number;
  setPage(page: number): void;
}
export default function TablePatient({ data, mutate, setPage, page }: Props) {
  const dataExit = data.patients && data.patients.length > 0;
  const { setKeyReloadPatient } = useContext(ClinicContext);
  //Thực hiện chuyển trang khi page không có phần tử nào
  useEffect(() => {
    if (!dataExit && page !== 1) {
      setPage(page - 1);
      setKeyReloadPatient((prev) => prev + 1);
    }
  }, [dataExit, page, setKeyReloadPatient, setPage]);

  return (
    <>
      {dataExit ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell width={"15%"} align="center">
                  Tên
                </StyledTableCell>
                <StyledTableCell width={"10%"} align="center">
                  Tuổi
                </StyledTableCell>
                <StyledTableCell width={"15%"} align="center">
                  Số điện thoại
                </StyledTableCell>
                <StyledTableCell width={"30%"} align="center">
                  Địa chỉ
                </StyledTableCell>
                <StyledTableCell width={"30%"} align="center">
                  Hành động
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.patients?.map((item: Patient) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell
                    width={"15%"}
                    align="center"
                    component="th"
                    scope="row"
                  >
                    {item.name}
                  </StyledTableCell>
                  <StyledTableCell width={"10%"} align="center">
                    {item.age}
                  </StyledTableCell>
                  <StyledTableCell width={"15%"} align="center">
                    {item.phoneNumber}
                  </StyledTableCell>
                  <StyledTableCell width={"30%"} align="center">
                    {item.address}
                  </StyledTableCell>
                  <StyledTableCell width={"30%"} align="center">
                    <div className="flex justify-center">
                      <div>
                        <Link to={`${config.router.viewpatient}${item.id}`}>
                          <Button variant="contained">Xem</Button>
                        </Link>
                      </div>
                      <div className="mx-2">
                        <ModalUpdatePatient data={item} mutate={mutate} />
                      </div>
                      <div>
                        <ModalDeletePatient data={item} mutate={mutate} />
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
            Hiện tại danh sách bệnh nhân đang trống. Vui lòng thêm bệnh nhân
          </span>
        </div>
      )}
    </>
  );
}
