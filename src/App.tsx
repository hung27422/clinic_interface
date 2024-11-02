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
import useConfirmTokenUser from "./hooks/ConfirmTokenUser/useConfirmTokenUser";

function AppRoutes() {
  const { isTokenExpired } = useConfirmTokenUser();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    // Chỉ điều hướng sau khi trạng thái đã được khởi tạo
    if (isTokenExpired && pathname === "/login") {
      navigate("/");
    } else if (!isTokenExpired && pathname !== "/login") {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTokenExpired, navigate]);

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
