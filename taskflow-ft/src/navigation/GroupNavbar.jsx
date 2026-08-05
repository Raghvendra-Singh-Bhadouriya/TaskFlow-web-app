import { useContext } from "react";
import {
  FaEllipsisV,
  FaTimes,
  FaUsers,
} from "react-icons/fa";

import { GroupDetailFetchContext } from "../context/GroupDetailFetchContext";
import { ToggleFormShowContext } from "../context/ToggleFormContext";
import GroupMenu from "../components/GroupMenu";


const GroupNavbar = () => {

  const { groupDetail } = useContext(
    GroupDetailFetchContext
  );

  const {
    GroupMenuOpen,
    GroupMenuClose,
    showGroupMenu,
  } = useContext(
    ToggleFormShowContext
  );

  return (
    <>
      <div
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
            px-4
            sm:px-6
            lg:px-8

            py-4

            flex
            items-center
            justify-between
          "
        >
          {/* Group Info */}
          <div
            className="
              flex
              items-center

              gap-3

              min-w-0
            "
          >
            <div
              className="
                h-10
                w-10

                rounded-full

                bg-blue-100

                flex
                items-center
                justify-center
              "
            >
              <FaUsers
                className="
                  text-blue-600
                  text-lg
                "
              />
            </div>

            <div className="min-w-0">
              <h1
                className="
                  text-lg
                  sm:text-xl
                  lg:text-2xl

                  font-bold

                  text-gray-800

                  truncate
                "
              >
                {groupDetail?.groupname ||
                  "Group"}
              </h1>

              <p
                className="
                  text-xs
                  sm:text-sm

                  text-gray-500
                "
              >
                Team Workspace
              </p>
            </div>
          </div>

          {/* Menu Button */}
          <button
            onClick={
              showGroupMenu
                ? GroupMenuClose
                : GroupMenuOpen
            }
            className="
              h-10
              w-10

              rounded-full

              flex
              items-center
              justify-center

              hover:bg-gray-100

              transition
            "
          >
            {showGroupMenu ? (
              <FaTimes
                className="
                  text-lg
                  text-gray-600
                "
              />
            ) : (
              <FaEllipsisV
                className="
                  text-lg
                  text-gray-600
                "
              />
            )}
          </button>
        </div>
      </div>

      <GroupMenu />
    </>
  );
};

export default GroupNavbar;