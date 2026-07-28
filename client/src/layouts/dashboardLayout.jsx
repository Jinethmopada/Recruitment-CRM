import { Outlet } from "react-router-dom";
import SideBar from "../components/sideBar";
import NavBar from "../components/navbar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex flex-col flex-1 md:ml-20">
        <NavBar />
        <main className="p-6 bg-slate-100 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;