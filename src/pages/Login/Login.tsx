import { Button, TextField } from "@mui/material";

function Login() {
  return (
    <div className="flex flex-col items-center justify-center w-[80%] h-[90%] bg-page rounded-lg border-primary border-2">
      <h2 className="text-5xl text-primary mb-6">Đăng Nhập</h2>
      <div className="flex flex-col">
        <TextField
          className="w-96"
          style={{ marginBottom: "16px" }}
          id="outlined-basic"
          label="Tài khoản"
          variant="outlined"
        />
        <TextField
          className="w-96"
          id="outlined-basic"
          label="Mật khẩu"
          variant="outlined"
        />
      </div>
      <div className="mt-6">
        <Button
          style={{ width: "200px", height: "40px", fontSize: "18px" }}
          variant="contained"
        >
          Đăng Nhập
        </Button>
      </div>
    </div>
  );
}

export default Login;
