import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

import { AuthContext } from "../context/AuthContext";
import LogoutButton from "../pages/Logout";

const PublicNavbar = () => {
  const { logIn } = useContext(AuthContext);

  const location = useLocation();
  const pathname = location.pathname;

  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <nav
      className="
        sticky top-0 z-50

        bg-white/80
        backdrop-blur-md

        border-b border-gray-200

        shadow-sm
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto

          px-4
          sm:px-6
          lg:px-8

          h-16

          flex
          items-center
          justify-between
        "
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center"
        >
          <img
            src="/taskflow_logo1.png"
            alt="TaskFlow"
            className="
              h-10
              sm:h-12

              object-contain
            "
          />
        </Link>

        {/* Desktop Menu */}
        {!logIn && (
          <div
            className="
              hidden md:flex

              items-center

              gap-8
            "
          >
            <Link
              to="/features"
              className="
                text-gray-600

                font-medium

                hover:text-blue-600

                transition
              "
            >
              Features
            </Link>

            <Link
              to="/pricing"
              className="
                text-gray-600

                font-medium

                hover:text-blue-600

                transition
              "
            >
              Pricing
            </Link>

            <Link
              to="/about"
              className="
                text-gray-600

                font-medium

                hover:text-blue-600

                transition
              "
            >
              About
            </Link>
          </div>
        )}

        {/* Right Side */}
        <div
          className="
            flex
            items-center

            gap-3
            md:gap-4
          "
        >
          {logIn && <LogoutButton />}

          {/* Home Page */}
          {!logIn &&
            pathname === "/" && (
              <Link to="/signin">
                <button
                  className="
                    px-5 py-2

                    rounded-full

                    border

                    font-medium

                    hover:border-blue-600
                    hover:text-blue-600

                    transition-all
                    duration-300
                  "
                >
                  Sign In
                </button>
              </Link>
            )}

          {/* Signup Page */}
          {!logIn &&
            pathname === "/signup" && (
              <Link to="/signin">
                <button
                  className="
                    px-5 py-2

                    rounded-full

                    border

                    font-medium

                    hover:border-blue-600
                    hover:text-blue-600

                    transition-all
                    duration-300
                  "
                >
                  Sign In
                </button>
              </Link>
            )}

          {/* Signin Page */}
          {!logIn &&
            pathname === "/signin" && (
              <Link to="/signup">
                <button
                  className="
                    px-4 py-2

                    rounded-full

                    bg-blue-600
                    text-white
                    text-sm

                    font-medium

                    hover:bg-blue-700

                    transition-all
                    duration-300
                  "
                >
                  Create Account
                </button>
              </Link>
            )}

          {/* Mobile Menu Button */}
          {!logIn && (
            <button
              onClick={() =>
                setMobileMenu(!mobileMenu)
              }
              className="
                md:hidden

                text-xl

                text-gray-700
              "
            >
              {mobileMenu ? (
                <FaTimes />
              ) : (
                <FaBars />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {!logIn &&
        mobileMenu && (
          <div
            className="
              md:hidden

              bg-white

              border-t

              p-4

              flex
              flex-col

              gap-4
            "
          >
            <Link
              to="/features"
              onClick={() =>
                setMobileMenu(false)
              }
              className="
                text-gray-700

                hover:text-blue-600
              "
            >
              Features
            </Link>

            <Link
              to="/pricing"
              onClick={() =>
                setMobileMenu(false)
              }
              className="
                text-gray-700

                hover:text-blue-600
              "
            >
              Pricing
            </Link>

            <Link
              to="/about"
              onClick={() =>
                setMobileMenu(false)
              }
              className="
                text-gray-700

                hover:text-blue-600
              "
            >
              About
            </Link>
          </div>
        )}
    </nav>
  );
};

export default PublicNavbar;