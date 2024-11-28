import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar";

function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow bg-gray-100 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
