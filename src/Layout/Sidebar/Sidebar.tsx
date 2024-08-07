import { Link, useLocation } from "react-router-dom";
import config from "../../configs/configs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHospitalUser,
  faHouse,
  faNotesMedical,
} from "@fortawesome/free-solid-svg-icons";
import SidebarBottom from "./SidebarsBottom/SidebarsBottom";

const menus = [
  {
    id: 1,
    title: "Dashboard",
    pathname: config.router.home,
    icon: <FontAwesomeIcon icon={faHouse} className="w-6 h-6 mr-3" />,
  },
  {
    id: 2,
    title: "Bệnh nhân",
    pathname: config.router.patients,
    icon: <FontAwesomeIcon icon={faHospitalUser} className="w-6 h-6 mr-3" />,
  },
  {
    id: 3,
    title: "Quản lý thuốc",
    pathname: config.router.medications,
    icon: <FontAwesomeIcon icon={faNotesMedical} className="w-6 h-6 mr-3" />,
  },
];
function Sidebar() {
  const pathName = useLocation();
  const isActive = (itemPathname: string) => {
    return (
      pathName.pathname === itemPathname ||
      pathName.pathname.startsWith(itemPathname + "/")
    );
  };
  return (
    <div className="flex flex-col p-6 relative height-sidebar ">
      <div>
        {menus.map((item, index) => {
          return (
            <Link
              className={`flex items-center px-4 py-2 mt-1 cursor-pointer rounded-md ${
                isActive(item.pathname) ? " text-white bg-primary" : ""
              } `}
              key={index}
              to={item.pathname}
            >
              {item.icon}
              <span className="text-lg font-bold tracking-widest">
                {item.title}
              </span>
            </Link>
          );
        })}
      </div>
      <div className="absolute bottom-4 w-full">
        <SidebarBottom />
      </div>
    </div>
  );
}

export default Sidebar;
