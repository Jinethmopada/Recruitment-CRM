import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/sideBar";
import NavBar from "../components/navbar";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div
        className={`transition-all duration-300 ${
          isOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        <NavBar />

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;