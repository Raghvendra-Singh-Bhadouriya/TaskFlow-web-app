import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaBell,
  FaBars,
} from "react-icons/fa";

import { AuthContext } from "../context/AuthContext";
import { SidebarToggleContext } from "../context/SidebarToggleContext";

const AppNavbar = () => {
  const { decodedToken } = useContext(AuthContext);
  const { isSidebarOpen } = useContext(SidebarToggleContext);

  return (
    <header
      className="
        sticky
        top-0
        z-40

        bg-white/80
        backdrop-blur-md

        border-b
        border-gray-200

        shadow-sm
      "
    >
      <div
        className="
          h-16

          px-4
          sm:px-6
          lg:px-8

          flex
          items-center
          justify-between
        "
      >
        {/* LEFT SIDE */}
        <div
          className="
            flex
            items-center
            gap-4
          "
        >
          {/* Mobile Menu Icon */}
          <button
          onClick={isSidebarOpen}
            className="
              lg:hidden

              text-xl

              text-gray-600

              hover:text-blue-600

              transition
            "
          >
            <FaBars />
          </button>

          <div>
            <h1
              className="
                text-lg
                sm:text-xl

                font-bold

                text-gray-800
              "
            >
              Dashboard
            </h1>

            <p
              className="
                hidden sm:block

                text-xs

                text-gray-500
              "
            >
              Welcome back,
              {" "}
              {decodedToken?.username}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          className="
            flex
            items-center

            gap-3
            sm:gap-5
          "
        >
          {/* Notification */}
          <button
            className="
              relative

              p-2

              rounded-xl

              hover:bg-gray-100

              transition
            "
          >
            <FaBell
              className="
                text-lg

                text-gray-600
              "
            />

            <span
              className="
                absolute

                top-1
                right-1

                h-2
                w-2

                bg-red-500

                rounded-full
              "
            />
          </button>

          {/* Profile */}
          <Link
            to="/profile"
            className="
              flex
              items-center

              gap-3
            "
          >
            <FaUserCircle
              className="
                text-3xl
                sm:text-4xl

                text-blue-600

                hover:text-blue-700

                transition
              "
            />

            <div className="hidden md:block">
              <p
                className="
                  font-semibold

                  text-gray-800
                "
              >
                {decodedToken?.username}
              </p>

              <p
                className="
                  text-xs

                  text-gray-500
                "
              >
                Team Member
              </p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AppNavbar;