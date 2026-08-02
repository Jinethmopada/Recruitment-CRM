import { TfiDashboard } from "react-icons/tfi";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { RxPeople } from "react-icons/rx";
import { BsPeopleFill } from "react-icons/bs";
import { HiMenu, HiX } from "react-icons/hi";
import { BiTask } from "react-icons/bi";
import { SlCalender } from "react-icons/sl";
import { VscGraphLine } from "react-icons/vsc";
import { TiMessages } from "react-icons/ti";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    icon: TfiDashboard,
    path: "/dashboard",
  },
  {
    title: "Jobs",
    icon: PiSuitcaseSimpleLight,
    path: "/jobs",
  },
  {
    title: "Candidates",
    icon: RxPeople,
    path: "/candidates",
  },
  {
    title: "Applications",
    icon: BiTask,
  },
  {
    title: "Calendar",
    icon: SlCalender,
  },
  {
    title: "Reports",
    icon: VscGraphLine,
  },
  {
    title: "Messages",
    icon: TiMessages,
  },
  {
    title: "Settings",
    icon: IoSettingsOutline,
  },
  {
    title: "Profile",
    icon: CgProfile,
  },
  {
    title: "Logout",
    icon: FiLogOut,
    path: "/login",
  },
];

const SideBar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* Mobile Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded bg-slate-900 text-white md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        onMouseEnter={() => {
          if (window.innerWidth >= 768) setIsOpen(true);
        }}
        onMouseLeave={() => {
          if (window.innerWidth >= 768) setIsOpen(false);
        }}
        className={`
          fixed
          top-0
          left-0
          h-screen
          bg-slate-900
          text-white
          z-40
          transition-all
          duration-300
          ${isOpen ? "w-64" : "w-20"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-700">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <BsPeopleFill size={20} />
          </div>

          <span
            className={`font-bold text-lg whitespace-nowrap transition-all ${
              isOpen ? "opacity-100" : "opacity-0 hidden"
            }`}
          >
            Recruit CRM
          </span>
        </div>

        {/* Menu */}
        <nav className="flex flex-col justify-between h-[calc(100%-76px)]">
          <div>
            {menuItems
              .filter((item) => item.title !== "Logout")
              .map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.title}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-6 py-4 hover:bg-indigo-600 transition-colors`
                    }
                  >
                    <Icon size={22} />

                    <span
                      className={`ml-4 whitespace-nowrap transition-all ${
                        isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                      }`}
                    >
                      {item.title}
                    </span>
                  </NavLink>
                );
              })}
          </div>

          {/* Logout */}
          <NavLink
            to="/login"
            className="flex items-center px-6 py-4 border-t border-slate-700 hover:bg-red-600 transition-colors"
          >
            <FiLogOut size={22} />

            <span
              className={`ml-4 transition-all ${
                isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
              }`}
            >
              Logout
            </span>
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default SideBar;