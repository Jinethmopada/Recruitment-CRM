import { useState } from "react";
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
    path:'/dashboard'
  },
  {
    title: "Jobs",
    icon: PiSuitcaseSimpleLight,
    path:'/jobs'
  },
  {
    title: "Candidates",
    icon: RxPeople,
  },
  {
    title: "Applications",
    icon: BiTask
  },
  {
    title: "Calender",
    icon: SlCalender
  },
  {
    title: "Reports",
    icon: VscGraphLine
  },
  {
    title: "Messages",
    icon: TiMessages
  },
  {
    title: "Settings",
    icon: IoSettingsOutline
  },
  {
    title: "Profile",
    icon: CgProfile
  },
  {
    title: "Logout",
    icon: FiLogOut,
    path:'/login'
  },
];

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-slate-900 text-white md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>

      <div
        onMouseEnter={() => {
          if (window.innerWidth >= 768) setIsOpen(true);
        }}
        onMouseLeave={() => {
          if (window.innerWidth >= 768) setIsOpen(false);
        }}
        className={`
          fixed md:relative
          top-0 left-0
          min-h-screen
          bg-slate-900
          text-white
          transition-all
          duration-300
          z-40

          ${
            isOpen
              ? "translate-x-0 w-64"
              : "-translate-x-full md:translate-x-0 md:w-20"
          }
        `}
      >
        
        <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-800">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <BsPeopleFill size={20} />
          </div>

          {isOpen && (
            <h2 className="text-lg font-bold whitespace-nowrap">
              Recruitment CRM
            </h2>
          )}
        </div>

        <nav className="mt-5">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                className={`
                  flex items-center
                  px-5
                  py-4
                  cursor-pointer
                  hover:bg-indigo-600
                  transition-colors

                  ${isOpen ? "justify-start" : "justify-center"}
                `}
              >
                <Icon size={22} />

                <span
                  className={`
                    ml-4
                    whitespace-nowrap
                    overflow-hidden
                    transition-all
                    duration-300

                    ${
                      isOpen
                        ? "opacity-100 w-auto"
                        : "opacity-0 w-0"
                    }
                  `}
                >
                  {item.title}
                </span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default SideBar;