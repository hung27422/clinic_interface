import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { Account } from "../../types";
import useHandleLogin from "./hooks/useHandleLogin";

function Login() {
  const [valueLogin, setValueLogin] = useState<Account>({
    name: "",
    password: "",
  });

  const { handleUserLogin } = useHandleLogin();
  const handleLoginValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValueLogin((prev) => ({ ...prev, [name]: value }));
  };
  const handleLogin = () => {
    handleUserLogin({ name: valueLogin.name, password: valueLogin.password });
  };
  return (
    <div className="flex flex-col items-center justify-center w-[80%] h-[80vh]  bg-page rounded-lg border-primary border-2">
      <h2 className="text-5xl text-primary mb-6">Đăng Nhập</h2>
      <div className="flex flex-col">
        <TextField
          className="w-96"
          style={{ marginBottom: "16px" }}
          id="name"
          name="name"
          label="Tài khoản"
          variant="outlined"
          onChange={handleLoginValue}
        />
        <TextField
          className="w-96"
          id="password"
          name="password"
          label="Mật khẩu"
          variant="outlined"
          onChange={handleLoginValue}
        />
      </div>
      <div className="mt-6">
        <Button
          style={{ width: "200px", height: "40px", fontSize: "18px" }}
          variant="contained"
          onClick={handleLogin}
        >
          Đăng Nhập
        </Button>
      </div>
    </div>
  );
}

export default Login;
