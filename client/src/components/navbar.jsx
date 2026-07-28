import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";

const NavBar = () => {
  return (
    <header className="h-16 bg-slate-100 shadow-sm border border-gray-300 flex items-center justify-end px-6">
      <div className="flex items-center gap-6">
        <IoMdNotificationsOutline
          size={26}
          className="cursor-pointer text-gray-600"
        />

        <div className="flex items-center gap-2">
          <FaRegUserCircle size={30} className="text-gray-600" />
          <div>
            <h4 className="font-medium text-sm">John Doe</h4>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;