import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ToggleFormShowContext } from "../context/ToggleFormContext";
import { GroupDetailFetchContext } from "../context/GroupDetailFetchContext";

import TaskCreateForm from "../forms/TaskCreateForm";
import AddMemberInGroupForm from "../forms/AddMemberInGroupForm";
import Task from "../task/Task";

const GroupDetail = () => {
  const {
    TaskFormOpen,
    showTaskForm,
    showAddMemberForm,
  } = useContext(ToggleFormShowContext);

  const {
    groupDetail,
    setGroupDetail,
  } = useContext(GroupDetailFetchContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { groupId } = useParams();

  const token = localStorage.getItem("token");

  async function fetchGroupName(id) {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:8080/group/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setGroupDetail(res?.data?.data);
      //console.log(res?.data?.data)
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Failed to fetch group"
      );

      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (groupId) {
      fetchGroupName(groupId);
    }
  }, [groupId]);

  {/* Loading */}
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <p className="text-lg text-gray-500">
          Loading group...
        </p>
      </div>
    );
  }

  {/* Error */}
  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen

        bg-gray-50

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

          p-5
          md:p-8

          mb-8
        "
      >
        <div className="flex justify-between items-start">
          <div>
            <h1
              className="
                text-2xl
                sm:text-3xl
                md:text-4xl

                font-bold
                text-gray-800
              "
            >
              {groupDetail?.groupname ||
                "Group Dashboard"}
            </h1>

            <p
              className="
                mt-2

                text-sm
                md:text-base

                text-gray-500
              "
            >
              Manage tasks, members and
              collaboration for this group.
            </p>
          </div>

        </div>

        <div
          className="
            flex flex-wrap

            gap-3

            mt-6
          "
        >
          <div
            className="
              bg-blue-50

              text-blue-700

              px-4 py-2

              rounded-full

              text-sm
              font-medium
            "
          >
            {groupDetail?.members?.length || 0}
            {" "}Members
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAddMemberForm && (
        <AddMemberInGroupForm />
      )}

      <TaskCreateForm />

      {/* Tasks Section */}
      <div
        className="
          bg-white

          rounded-3xl

          shadow-md

          p-4
          md:p-6
        "
      >
        <div className="mb-5">
          <h2
            className="
              text-xl
              md:text-2xl

              font-bold

              text-gray-800
            "
          >
            Tasks
          </h2>

          <p className="text-gray-500 mt-1">
            View and manage all group tasks.
          </p>
        </div>

        <Task />
      </div>

      {/* Floating Action Button */}
      {!showTaskForm && (
        <button
          onClick={TaskFormOpen}
          className="
            fixed

            bottom-5
            right-5

            sm:bottom-6
            sm:right-6

            md:bottom-8
            md:right-8

            w-14
            h-14

            md:w-16
            md:h-16

            rounded-full

            bg-blue-600
            text-white

            text-2xl
            md:text-3xl

            shadow-xl

            hover:bg-blue-700
            hover:scale-105

            transition-all
            duration-300

            flex
            items-center
            justify-center

            z-40
          "
        >
          +
        </button>
      )}
    </div>
  );
};

export default GroupDetail;