import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import api from "../services/axios";

const GroupMembers = () => {
  const [membersData, setMembersData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { groupId } = useParams();

  async function fetchGroupMembers(id) {
    const token = localStorage.getItem("token")
    try {
      setLoading(true);

      // const res = await axios.get(
      //   `http://localhost:8080/group/${id}`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`
      //     }
      //   }
      // );
      const res = await api.get(`/group/${id}`)

      setMembersData(res?.data?.data);
    } catch (error) {
      console.log(error);

      setError(
        error?.response?.data?.message ||
          "Failed to load members"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (groupId) {
      fetchGroupMembers(groupId);
    }
  }, [groupId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500 text-lg">
          Loading members...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl">
          {error}
        </div>
      </div>
    );
  }

  const members = membersData?.members || [];

  return (
    <div
      className="
        w-full

        px-4
        sm:px-6
        md:px-8
        lg:px-10

        py-6
      "
    >
      {/* Page Header */}
      <div className="mb-8">
        <h1
          className="
            text-2xl
            sm:text-3xl
            md:text-4xl

            font-bold
            text-gray-800
          "
        >
          Team Members
        </h1>

        <p
          className="
            text-gray-500

            mt-2

            text-sm
            sm:text-base
          "
        >
          Manage and view all members of this group.
        </p>
      </div>

      {/* Empty State */}
      {members.length === 0 ? (
        <div
          className="
            bg-white

            rounded-2xl

            shadow-md

            p-10

            text-center
          "
        >
          <h2 className="text-xl font-semibold text-gray-700">
            No Members Found
          </h2>

          <p className="text-gray-500 mt-2">
            Add members to start collaborating.
          </p>
        </div>
      ) : (
        <div
          className="
            grid

            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4

            gap-5
          "
        >
          {members.map((member) => {
            const username =
              member?.userId?.username || "Unknown";

            const initial =
              username.charAt(0).toUpperCase();

            return (
              <div
                key={member?._id}
                className="
                  bg-white

                  border border-gray-100

                  rounded-2xl

                  shadow-md
                  hover:shadow-xl

                  transition-all
                  duration-300

                  p-5
                "
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div
                    className="
                      w-12 h-12
                      sm:w-14 sm:h-14

                      flex items-center justify-center

                      rounded-full

                      bg-blue-600
                      text-white

                      font-bold

                      text-lg
                    "
                  >
                    {initial}
                  </div>

                  {/* User Info */}
                  <div>
                    <h2
                      className="
                        font-semibold
                        text-gray-800

                        text-base
                        sm:text-lg
                      "
                    >
                      @{username}
                    </h2>

                    <p
                      className="
                        text-sm
                        text-gray-500
                      "
                    >
                      Team Member
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GroupMembers;