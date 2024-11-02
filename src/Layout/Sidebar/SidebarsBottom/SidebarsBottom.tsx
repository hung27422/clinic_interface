import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import useDecodedUserToken from "../../../api/hooks/useDecodedUserToken";

export default function SidebarsBottom() {
  const { decodedToken } = useDecodedUserToken();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Xóa dữ liệu từ localStorage để đăng xuất
    localStorage.removeItem("userData");
    window.location.reload();
  };
  const firstCharName = decodedToken?.name ?? "A";
  return (
    <div>
      <Button
        id="basic-button"
        variant="contained"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{ width: "84%", backgroundColor: "#1b9fc9", fontSize: "18px" }}
      >
        <Avatar
          style={{ width: "32px", height: "32px", marginRight: "12px" }}
          sx={{ bgcolor: deepOrange[500] }}
        >
          {firstCharName[0]}
        </Avatar>
        {decodedToken?.name}
      </Button>
      <Menu
        id="basic-menu"
        aria-setsize={500}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MenuItem className="min-w-52" onClick={handleClose}>
          Tài khoản
        </MenuItem>
        <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
      </Menu>
    </div>
  );
}
