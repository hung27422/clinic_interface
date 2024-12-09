import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import publicRoutes from "./routes/routes";
import "./App.css";
import DefaultLayout from "./Layout/DefaultLayout/DefaultLayout";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { JwtPayload, jwtDecode } from "jwt-decode";

function AppRoutes() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  //Lấy data user lưu từ local storage
  const storedDataUser = JSON.parse(localStorage.getItem("userData") || "{}");

  const token = storedDataUser?.token;
  let isTokenExpired = true; // Mặc định là token hết hạn, nếu không hợp lệ
  // Check xem có token và token có phải là string không
  if (token && typeof token === "string") {
    // Phải thì thực hiện check thời gian token
    try {
      const decoded: JwtPayload = jwtDecode(token);
      const expExpirationTime = decoded.exp ?? 0;
      const currentTime = Date.now() / 1000;
      isTokenExpired = currentTime > expExpirationTime;
    } catch (error) {
      console.error("Failed to decode token:", error);
      isTokenExpired = true; // Nếu không thì cho token là hết hạn
    }
  }

  useEffect(() => {
    // Nếu đã đăng nhập mà người dùng cố truy cập về login thì về "/"
    if (!isTokenExpired && pathname === "/login") {
      navigate("/");
    } else if (isTokenExpired && pathname !== "/login") {
      navigate("/login"); //Token hết hạn thì về trang login
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTokenExpired, pathname, navigate]);
  return (
    <Routes>
      {publicRoutes.map((router, index) => {
        const Layout = router.layout ? router.layout : DefaultLayout;
        const Page = router.component;

        return (
          <Route
            key={index}
            path={router.path}
            element={
              <Layout>
                <ToastContainer />
                <Page />
              </Layout>
            }
          />
        );
      })}
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <div>
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
