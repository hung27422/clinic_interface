import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface Props {
  count: number; // Tổng số trang
  page: number; // Trang hiện tại
  onChange?: (event: React.ChangeEvent<unknown>, value: number) => void; // Hàm xử lý thay đổi trang
}
export default function PaginationClinic({ count, page, onChange }: Props) {
  return (
    <Stack spacing={2}>
      <Pagination
        page={page}
        count={count}
        onChange={onChange}
        variant="outlined"
        color="primary"
      />
    </Stack>
  );
}
