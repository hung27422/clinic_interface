// import Navbar from "../Navbar/Navbar";
import "../../App.css";
import Sidebar from "../Sidebar/Sidebar";
interface Props {
  children: React.ReactNode;
}

function DefaultLayout({ children }: Props) {
  return (
    <div className="bg-background h-[100vh] grid grid-cols-5 gap-2 p-2">
      <div className="col-span-1 bg-page rounded-md">
        <Sidebar />
      </div>
      <div className="col-span-4 bg-page rounded-md overflow-y-auto overflow-hidden hidden-scrollbar">
        {/* <Navbar /> */}
        <div className="p-10">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
