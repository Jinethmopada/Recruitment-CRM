import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";

const NavBar = () => {
  const userName = localStorage.getItem("userName") || "User";

  return (
    <header data-testid="navbar" className="h-16 bg-slate-100 shadow-sm border border-gray-300 flex items-center justify-end px-6">
      <div data-testid="navbar-actions" className="flex items-center gap-6">
        <button
          type="button"
          data-testid="notifications-button"
          aria-label="Notifications"
          className="cursor-pointer text-gray-600"
        >
          <IoMdNotificationsOutline size={26} />
        </button>

        <div data-testid="user-profile" className="flex items-center gap-2">
          <FaRegUserCircle size={30} className="text-gray-600" />
          <div>
            <h4 data-testid="navbar-user-name" className="font-medium text-sm">{userName}</h4>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;