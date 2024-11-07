import { Button, Checkbox, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Account } from "../../types";
import useHandleLogin from "./hooks/useHandleLogin";
import useValidation, {
  ValidationErrorsLogin,
} from "../../hooks/components/useValidation";
import { ValidationError } from "yup";

function Login() {
  const [errors, setErrors] = useState<ValidationErrorsLogin>({});
  const [showPassword, setShowPassword] = useState(true);

  const [valueLogin, setValueLogin] = useState<Account>({
    name: "",
    password: "",
  });
  const { loginSchema } = useValidation();
  const { handleUserLogin } = useHandleLogin();
  const handleLoginValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValueLogin((prev) => ({ ...prev, [name]: value }));
  };
  const handleLogin = async () => {
    try {
      await loginSchema.validate(valueLogin, { abortEarly: false });
      handleUserLogin({
        name: valueLogin.name,
        password: valueLogin.password,
      });
    } catch (err) {
      if (err instanceof ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          // Kiểm tra xem error.path có tồn tại không
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors(validationErrors); // Cập nhật lỗi vào trạng thái
      }
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  // Lắng nghe sự kiện nhấn phím Enter khi ở trang đăng nhập
  useEffect(() => {
    const handleEnterPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleLogin();
      }
    };

    document.addEventListener("keydown", handleEnterPress);
    return () => {
      document.removeEventListener("keydown", handleEnterPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueLogin]); // Lắng nghe sự thay đổi của `valueLogin` để cập nhật chính xác
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
          error={!!errors.name}
          helperText={errors.name}
          FormHelperTextProps={{
            sx: { fontSize: "1rem" }, // Thay đổi kích thước chữ helperText
          }}
          onFocus={() => setErrors((prev) => ({ ...prev, name: undefined }))}
          onChange={handleLoginValue}
        />

        <TextField
          className="w-96"
          id="password"
          name="password"
          type={showPassword ? "password" : "text"}
          label="Mật khẩu"
          variant="outlined"
          error={!!errors.password}
          helperText={errors.password}
          FormHelperTextProps={{
            sx: { fontSize: "1rem" }, // Thay đổi kích thước chữ helperText
          }}
          onChange={handleLoginValue}
          onFocus={() =>
            setErrors((prev) => ({ ...prev, password: undefined }))
          }
        />
        <div className="flex items-center">
          <Checkbox onChange={handleShowPassword} />
          <span className="text-lg">Hiện mật khẩu</span>
        </div>
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
