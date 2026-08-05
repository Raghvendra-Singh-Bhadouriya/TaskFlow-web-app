import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/axios";

const SingleGroup = () => {
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { id } = useParams();

  async function fetchSingleGroupData(groupId) {
    try {
      setLoading(true);

      // const res = await axios.get(
      //   `http://localhost:8080/single_group/${groupId}`
      // );
      const res = await api.get(`/single_group/${groupId}`)

      setGroup(res?.data);
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Failed to fetch group"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      fetchSingleGroupData(id);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500 text-lg">
          Loading group...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl">
          {error}
        </div>
      </div>
    );
  }

  const members = group?.members || [];

  return (
    <div
      className="
        px-4
        sm:px-6
        md:px-8
        lg:px-10

        py-6
      "
    >
      {/* Header */}
      <div
        className="
          bg-white

          rounded-3xl

          shadow-md

          p-6
          md:p-8

          mb-8
        "
      >
        <h1
          className="
            text-2xl
            md:text-4xl

            font-bold
            text-gray-800
          "
        >
          {group?.groupname || "Group"}
        </h1>

        <p className="text-gray-500 mt-2">
          Manage members and tasks for this group.
        </p>

        <div className="mt-4">
          <span
            className="
              inline-flex

              px-4 py-2

              rounded-full

              bg-blue-100
              text-blue-700

              font-medium
            "
          >
            {members.length} Members
          </span>
        </div>
      </div>

      {/* Members */}
      <div>
        <h2
          className="
            text-xl
            md:text-2xl

            font-bold

            mb-4
          "
        >
          Members
        </h2>

        {members.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-6">
            No members found.
          </div>
        ) : (
          <div
            className="
              grid

              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4

              gap-4
            "
          >
            {members.map((member) => {
              const username =
                member?.userId?.username || "Unknown";

              return (
                <div
                  key={member?._id}
                  className="
                    bg-white

                    rounded-2xl

                    shadow-md
                    hover:shadow-xl

                    transition

                    p-5
                  "
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        w-12 h-12

                        rounded-full

                        bg-blue-600
                        text-white

                        flex items-center justify-center

                        font-bold
                      "
                    >
                      {username[0]?.toUpperCase()}
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800">
                        @{username}
                      </h3>

                      <p className="text-sm text-gray-500">
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
    </div>
  );
};

export default SingleGroup;