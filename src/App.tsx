import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import publicRoutes from "./routes/routes";
import "./App.css";
import DefaultLayout from "./Layout/DefaultLayout/DefaultLayout";
import { useContext } from "react";
import { ClinicContext } from "./Context/ContextClinic";
import config from "./configs/configs";
import { ToastContainer } from "react-toastify";

function App() {
  const { dataUser } = useContext(ClinicContext);
  const isUserLoggedIn = Object.keys(dataUser).length > 0; // Kiểm tra xem user đã đăng nhập hay chưa

  return (
    <Router>
      <div>
        <Routes>
          {publicRoutes.map((router, index) => {
            let Layout = DefaultLayout;

            if (router.layout) {
              Layout = router.layout;
            }

            const Page = router.component;

            // Nếu đã đăng nhập
            if (isUserLoggedIn) {
              // Nếu đang cố gắng truy cập vào trang login, chuyển hướng đến dashboard
              if (router.path === config.router.login) {
                return (
                  <Route
                    key={index}
                    path={router.path}
                    element={<Navigate to={config.router.home} replace />}
                  />
                );
              }
            } else {
              // Nếu chưa đăng nhập và không phải trang login, chuyển hướng về trang login
              if (router.path !== config.router.login) {
                return (
                  <Route
                    key={index}
                    path={router.path}
                    element={<Navigate to={config.router.login} replace />}
                  />
                );
              }
            }

            // Render các routes còn lại
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
      </div>
    </Router>
  );
}

export default App;
