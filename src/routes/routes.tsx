import config from "../configs/configs";
import HomePage from "../pages/Dashboard/Dashboard";
import Patient from "../pages/Patient/Patient";
import ViewPatients from "../pages/ViewPatient/ViewPatient";
const publicRoutes = [
  { path: config.router.home, component: HomePage },
  {
    path: config.router.patients,
    component: Patient,
  },
  {
    path: `${config.router.viewpatient}:id`,
    component: ViewPatients,
  },
];
export default publicRoutes;
