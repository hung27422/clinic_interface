/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import useToastify from "../../../hooks/Toastify/useToastify";
import { useNavigate } from "react-router";

interface LoginData {
  name: string;
  password: string;
}

function useHandleLogin() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const { notify: notifySuccess } = useToastify({
    title: "Đăng nhập thành công",
    type: "success",
  });
  const { notify: notifyErr } = useToastify({
    title: "Tên đăng nhập hoặc mật khẩu không chính xác !!!",
    type: "error",
  });
  const { notify: notifyErrEmpty } = useToastify({
    title: "Vui lòng nhập tài khoản và mật khẩu !!!",
    type: "error",
  });

  const handleUserLogin = async (login: LoginData) => {
    try {
      const response = await axios.post(`${apiUrl}/User`, login, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      notifySuccess();
      if (response.data) {
        localStorage.setItem("userData", JSON.stringify(response.data));
        navigate("/");
      }
    } catch (error: any) {
      if (error.response?.data?.code === "Users.UncorrectLoginInfo") {
        // Giả định mã lỗi cho thông tin đăng nhập không hợp lệ
        notifyErr();
      } else if (
        error.response.data.description === "Sequence contains no elements."
      ) {
        notifyErrEmpty();
      } else {
        console.error("Đăng nhập thất bại:", error);
      }
    }
  };

  return { handleUserLogin };
}

export default useHandleLogin;
