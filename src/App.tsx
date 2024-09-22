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
  const { isAuthenticated } = useContext(ClinicContext);

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
            //Khi đăng nhập rồi mà người dùng cố quay lại đăng nhập thì quay lại trang Dashboard
            if (router.path === config.router.login && isAuthenticated) {
              return (
                <Route
                  key={index}
                  path={router.path}
                  element={<Navigate to={config.router.home} replace />}
                />
              );
            }
            return (
              <Route
                key={index}
                path={router.path}
                element={
                  isAuthenticated || router.path === config.router.login ? (
                    <Layout>
                      <ToastContainer />
                      <Page />
                    </Layout>
                  ) : (
                    <Navigate to={config.router.login} replace />
                  )
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
