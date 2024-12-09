/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import useToastify from "../../../hooks/Toastify/useToastify";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { ClinicContext } from "../../../Context/ContextClinic";

interface LoginData {
  name: string;
  password: string;
}

function useHandleLogin() {
  const navigate = useNavigate();
  const apiUrl = window.location.origin + "/api";
  const { setDataUser } = useContext(ClinicContext);
  const { notify: notifySuccess } = useToastify({
    title: "Đăng nhập thành công",
    type: "success",
  });
  const { notify: notifyErr } = useToastify({
    title: "Tên đăng nhập hoặc mật khẩu không chính xác. !!!",
    type: "error",
  });
  const { notify: notifyErrEmpty } = useToastify({
    title: "Vui lòng nhập tài khoản và mật khẩu. !!!",
    type: "error",
  });
  const { notify: notifyErrFail } = useToastify({
    title: "Không thể kết nối đến máy chủ. Vui lòng thử lại sau. !!!",
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
      if (response.data) {
        localStorage.setItem("userData", JSON.stringify(response.data));
        setTimeout(() => {
          navigate("/");
        }, 1000);
        setDataUser(true);
        notifySuccess();
      }
    } catch (error: any) {
      if (error.response?.data?.code === "Users.UncorrectLoginInfo") {
        notifyErr();
      } else if (
        error.response.data.description === "Sequence contains no elements."
      ) {
        notifyErrEmpty();
      } else if (!error.response) {
        notifyErrFail();
      } else {
        console.error("Đăng nhập thất bại:", error);
      }
    }
  };

  return { handleUserLogin };
}

export default useHandleLogin;
