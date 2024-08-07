import config from "../configs/configs";
import HomePage from "../pages/Dashboard/Dashboard";
import Patient from "../pages/Patient/Patient";
import ViewPatients from "../pages/ViewPatient/ViewPatient";
import Medication from "../pages/Medication/Medication";
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
  {
    path: `${config.router.medications}`,
    component: Medication,
  },
];
export default publicRoutes;
