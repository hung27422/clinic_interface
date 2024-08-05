import config from "../configs/configs";
import HomePage from "../pages/Home/Home";
import Patient from "../pages/Patient/Patient";
const publicRoutes = [
  { path: config.router.home, component: HomePage },
  {
    path: config.router.patients,
    component: Patient,
  },
];
export default publicRoutes;
