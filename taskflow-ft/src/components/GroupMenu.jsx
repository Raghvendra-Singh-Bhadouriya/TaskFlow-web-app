import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToggleFormShowContext } from "../context/ToggleFormContext";
import { GroupDetailFetchContext } from "../context/GroupDetailFetchContext";

const GroupMenu = () => {
  const {
    AddMemberFormOpen,
    showGroupMenu,
    GroupMenuClose,
  } = useContext(ToggleFormShowContext);

  const { groupDetail } = useContext(GroupDetailFetchContext);

  const navigate = useNavigate();

  const groupId = groupDetail?._id;

  const menuItems = [
    {
      id: 1,
      name: "Group Members",
      action: () => navigate(`/group/${groupId}/members`),
    },
    {
      id: 2,
      name: "Add New Members",
      action: AddMemberFormOpen,
    },
  ];

  const handleClick = (action) => {
    action();
    GroupMenuClose();
  };

  if (!showGroupMenu) return null;

  return (
    <div
      className="
        absolute
        right-0
        top-12

        z-50

        w-[90vw]
        max-w-[280px]

        sm:w-64
        md:w-72

        bg-white
        border border-gray-200

        rounded-2xl
        shadow-2xl

        overflow-hidden

        animate-in
        fade-in
        zoom-in
        duration-200
      "
    >
      {/* Header */}
      <div className="px-4 py-3 border-b bg-gray-50">
        <h3
          className="
            text-xs
            sm:text-sm
            font-semibold
            text-gray-700
            uppercase
            tracking-wider
          "
        >
          Group Menu
        </h3>
      </div>

      {/* Menu Items */}
      <div className="py-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.action)}
            className="
              w-full
              text-left

              px-4
              sm:px-5

              py-3

              text-sm
              sm:text-base

              font-medium
              text-gray-700

              hover:bg-blue-50
              hover:text-blue-600

              transition-all
              duration-200
            "
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GroupMenu;