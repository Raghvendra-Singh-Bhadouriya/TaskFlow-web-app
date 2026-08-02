import { Link, NavLink } from "react-router-dom";
import {
  FaHome,
  FaTasks,
  FaUsers,
  FaUserCircle,
  FaMoon,
  FaTimes,
} from "react-icons/fa";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { SidebarToggleContext } from "../context/SidebarToggleContext";
import LogoutButton from "../pages/Logout";

const Sidebar = () => {
  const { decodedToken } = useContext(AuthContext);
  const { sidebarShow, isSidebarClose } = useContext(SidebarToggleContext);

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "My Tasks",
      path: "/my_task",
      icon: <FaTasks />,
    },
    {
      name: "Team",
      path: "/team",
      icon: <FaUsers />,
    },
  ];

  return (
    <aside
      className={`
        ${
          sidebarShow ? 'block' : 'hidden'
        }
        lg:flex
        fixed
        left-0
        top-0
        h-screen
        w-72
        bg-white
        border-r
        border-gray-200
        shadow-sm
        flex-col
        z-50
`}
    >
      {/* Logo */}
      <div
        className="
          h-20
          flex
          items-center
          justify-between
          px-6
          border-b
          border-gray-200
        "
      >
        <Link to="/dashboard">
          <img
            src="/taskflow_logo1.png"
            alt="TaskFlow"
            className="h-10 object-contain"
          />
        </Link>
        
        <div>
          <button
          onClick={isSidebarClose}
          className="flex justify-center"
          >
            {sidebarShow && <FaTimes className="text-xl text-red-500"/>}
          </button>
        </div>
      </div>

      {/* User Info */}
      <div
        className="
          px-6
          py-5
          border-b
          border-gray-200
        "
      >
        <div className="flex items-center gap-3">
          <FaUserCircle className="text-4xl text-blue-600" />

          <div>
            <h3
              className="
                font-semibold
                text-gray-800
                truncate
              "
            >
              {decodedToken?.username}
            </h3>

            <p className="text-sm text-gray-500">
              Team Member
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav
        className="
          flex-1
          p-4
          space-y-2
        "
      >
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `
                flex
                items-center
                gap-3

                px-4
                py-3

                rounded-xl

                font-medium

                transition-all
                duration-200

                ${
                  isActive
                    ? "bg-blue-50 text-blue-600 shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }
              `
            }
          >
            <span className="text-lg">
              {item.icon}
            </span>

            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Dark Mode Placeholder */}
      <div
        className="
          px-4
          py-3
          border-t
          border-gray-200
        "
      >
        <button
          className="
            w-full

            flex
            items-center
            justify-between

            px-4
            py-3

            rounded-xl

            bg-gray-50

            hover:bg-gray-100

            transition
          "
        >
          <span className="flex items-center gap-3">
            <FaMoon />
            Dark Mode
          </span>

          <span
            className="
              text-xs
              bg-gray-200
              px-2
              py-1
              rounded-full
            "
          >
            Soon
          </span>
        </button>
      </div>

      {/* Logout */}
      <div
        className="
          p-4
          border-t
          border-gray-200
        "
      >
        <LogoutButton />
      </div>
    </aside>
  );
};

export default Sidebar;