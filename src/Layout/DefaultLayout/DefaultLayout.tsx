import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
interface Props {
  children: React.ReactNode;
}

function DefaultLayout({ children }: Props) {
  return (
    <div>
      <Sidebar />
      <Navbar />
      <div>{children}</div>
    </div>
  );
}

export default DefaultLayout;
