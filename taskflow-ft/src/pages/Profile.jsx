import SearchUserDropDown from "../forms/SearchUserDropdown";
import { FaUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { decodedToken } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      
      {/* Profile Header */}
      <div
        className="
          bg-white
          rounded-3xl
          shadow-sm
          border
          border-gray-200

          p-6
          md:p-8

          mb-8
        "
      >
        <div
          className="
            flex
            flex-col
            md:flex-row

            items-center

            gap-6
          "
        >
          {/* Avatar */}
          <div>
            <FaUserCircle
              className="
                text-8xl
                md:text-9xl

                text-blue-500
              "
            />
          </div>

          {/* User Info */}
          <div className="text-center md:text-left">
            <h1
              className="
                text-2xl
                md:text-3xl

                font-bold

                text-gray-800
              "
            >
              {decodedToken?.username || "User"}
            </h1>

            <p className="text-gray-500 mt-2">
              TaskFlow Team Member
            </p>

            <div
              className="
                mt-4

                inline-flex

                bg-green-100
                text-green-700

                px-4
                py-2

                rounded-full

                text-sm
                font-semibold
              "
            >
              Active Account
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div
        className="
          bg-white

          rounded-3xl

          shadow-sm

          border
          border-gray-200

          p-6
          md:p-8
        "
      >
        <div className="mb-6">
          <h2
            className="
              text-xl
              md:text-2xl

              font-bold

              text-gray-800
            "
          >
            Find Uers
          </h2>

          <p className="text-gray-500 mt-2">
            Search users and send friend requests.
          </p>
        </div>

        <div
          className="
            flex
            justify-center
          "
        >
          <SearchUserDropDown />
        </div>
      </div>
    </div>
  );
};

export default Profile;