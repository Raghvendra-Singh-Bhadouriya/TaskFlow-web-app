import { Outlet, useLocation } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import Sidebar from "./Sidebar";
import GroupNavbar from "./GroupNavbar";

const AppLayout = () => {
  const location = useLocation();

  const isGroupPage =
    location.pathname.startsWith("/group/");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        className="
          lg:ml-72

          min-h-screen

          flex
          flex-col
        "
      >
        {/* Navbar */}
        {isGroupPage ? (
          <GroupNavbar />
        ) : (
          <AppNavbar />
        )}

        {/* Page Content */}
        <main
          className="
            flex-1

            px-4
            sm:px-6
            md:px-8

            py-6
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;