import axios from "axios";
import { useContext, useEffect, useReducer, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteTask from "./DeleteTask";
import api from "../services/axios";

import {
  FaArrowLeft,
  FaCalendarAlt,
  FaUser,
  FaUsers,
  FaClock,
  FaTasks,
  FaHashtag,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import { AuthContext } from "../context/AuthContext";
import EditTask from "./EditTask";

const initialState = {
  singleTaskData: null,
  loading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        loading: true,
        error: "",
      };

    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        singleTaskData: action.payload,
      };

    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

const SingleTask = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { decodedToken } = useContext(AuthContext);
  const [ editTaskFormIsOpen, setEditTaskFormIsOpen ] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  async function fetchSingleTask(taskId) {
    dispatch({ type: "FETCH_START" });

    try {
      //const token = localStorage.getItem("token");

      // const res = await axios.get(
      //   `http://localhost:8080/group/single-task/${taskId}`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );

      const res = await api.get(`/group/single-task/${taskId}`)
      //console.log("data:", res?.data?.data)
      dispatch({
        type: "FETCH_SUCCESS",
        payload: res?.data?.data,
      });
    } catch (error) {
      dispatch({
        type: "FETCH_ERROR",
        payload:
          error.response?.data?.message ||
          error.message ||
          "Unable to load task.",
      });
    }
  }

  useEffect(() => {
    fetchSingleTask(id);
  }, [id]);

  const task = state.singleTaskData;

  // function formatDate(date) {
  //   if (!date) return "--";

  //   return new Date(date).toLocaleDateString("en-IN", {
  //     day: "numeric",
  //     month: "long",
  //     year: "numeric",
  //   });
  // }

  {/* Loading */}
  if (state.loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="h-14 w-14 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  {/* Error */}
  if (!state.loading && state.error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-6">
        <h2 className="text-3xl font-bold text-red-500">
          Failed to Load Task
        </h2>

        <p className="mt-3 text-gray-600">
          {state.error}
        </p>

        <button
          onClick={() => fetchSingleTask(id)}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (

  <section className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-10 py-8">
    {editTaskFormIsOpen && <EditTask taskId={state?.singleTaskData?._id} setEditTaskFormIsOpen={setEditTaskFormIsOpen} />}

    {/* Main Content */}
    {!state.loading &&
      !state.error &&
      state.singleTaskData && (

      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <p className="text-sm text-gray-500 mb-6">
          Dashboard
          <span className="mx-2">/</span>
          {state?.singleTaskData?.groupId?.groupname}
          <span className="mx-2">/</span>
          <span className="text-blue-600 font-semibold">
            Task Details
          </span>
        </p>

        {/* Header Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">

            {/* Left */}
            <div className="flex-1">

              <p className="uppercase tracking-widest text-blue-600 text-sm font-semibold mb-2">
                Task
              </p>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 break-words">
                {state.singleTaskData.title}
              </h1>

              <p className="text-gray-500 mt-4 leading-7 break-words">
                {state.singleTaskData.description}
              </p>

            </div>

            {/* Right */}
            <div className="flex flex-col gap-4 min-w-[230px]">

              <div className="bg-gray-100 rounded-xl p-4">

                <p className="text-xs text-gray-500 uppercase">
                  Status
                </p>

                <span
                  className={`inline-flex mt-2 px-4 py-2 rounded-full text-sm font-semibold ${
                        state.singleTaskData.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : state.singleTaskData.status === "in-progress"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {state.singleTaskData.status}
                </span>

              </div>

              <div className="bg-gray-100 rounded-xl p-4">

                <p className="text-xs uppercase text-gray-500">
                  Due Date
                </p>

                <h3 className="font-semibold text-lg mt-2 text-gray-700">
                  {new Date(
                    state.singleTaskData.dueDate
                  ).toLocaleDateString("en-IN")}
                </h3>

              </div>

            </div>

          </div>

        </div>



                {/* Information Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

          {/* Assigned By */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition">

            <p className="text-sm text-gray-500">
              Assigned By
            </p>

            <h2 className="mt-3 text-lg font-semibold text-gray-800 break-all">
              {state.singleTaskData.assignedBy.username || "Not Available"}
            </h2>

          </div>

          {/* Assigned To */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition">

            <p className="text-sm text-gray-500">
              Assigned To
            </p>

            <h2 className="mt-3 text-lg font-semibold text-gray-800 break-all">
              {state.singleTaskData.assignedTo.username || "Not Assigned"}
            </h2>

          </div>

          {/* Group ID */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition">

            <p className="text-sm text-gray-500">
              Group Name
            </p>

            <h2 className="mt-3 text-sm font-medium text-gray-700 break-all">
              {state.singleTaskData.groupId.groupname}
            </h2>

          </div>

          {/* Task ID */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition">

            <p className="text-sm text-gray-500">
              Task ID
            </p>

            <h2 className="mt-3 text-sm font-medium text-gray-700 break-all">
              {state.singleTaskData._id}
            </h2>

          </div>

        </div>

        {/* Date Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

          {/* Created Date */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

            <p className="text-sm text-gray-500">
              Created At
            </p>

            <h2 className="mt-3 text-xl font-semibold text-gray-800">
              {new Date(
                state.singleTaskData.createdAt
              ).toLocaleString("en-IN")}
            </h2>

          </div>

          {/* Due Date */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

            <p className="text-sm text-gray-500">
              Deadline
            </p>

            <h2 className="mt-3 text-xl font-semibold text-red-500">
              {new Date(
                state.singleTaskData.dueDate
              ).toLocaleDateString("en-IN")}
            </h2>

          </div>

        </div>

        {/* Description Card */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 mt-8">

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Task Description
          </h2>

          <p className="text-gray-600 leading-8 whitespace-pre-line">
            {state.singleTaskData.description}
          </p>

        </div>


                {/* Progress & Extra Details */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">

          {/* Progress Card */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Task Progress
            </h2>

            <div className="flex justify-between mb-3">
              <span className="text-gray-600">
                Current Status
              </span>

              <span className="font-semibold text-blue-600">
                {state.singleTaskData.status}
              </span>
            </div>

            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">

              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  state.singleTaskData.status === "completed"
                    ? "bg-green-500 w-full"
                    : state.singleTaskData.status === "in-progress"
                    ? "bg-yellow-500 w-2/3"
                    : "bg-red-500 w-1/4"
                }`}
              ></div>

            </div>

            <div className="mt-4 text-sm text-gray-500">
              {state.singleTaskData.status === "completed"
                ? "Task has been completed successfully."
                : state.singleTaskData.status === "in-progress"
                ? "Task is currently in progress."
                : "Task has not been started yet."
              }
            </div>

          </div>

          {/* Task Summary */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">

            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Task Summary
            </h2>

            <div className="space-y-5">

              <div className="flex justify-between border-b pb-3">

                <span className="text-gray-500">
                  Title
                </span>

                <span className="font-semibold text-right max-w-[60%] break-words">
                  {state.singleTaskData.title}
                </span>

              </div>

              <div className="flex justify-between border-b pb-3">

                <span className="text-gray-500">
                  Status
                </span>

                <span className="font-semibold capitalize">
                  {state.singleTaskData.status}
                </span>

              </div>

              <div className="flex justify-between border-b pb-3">

                <span className="text-gray-500">
                  Created
                </span>

                <span className="font-semibold">
                  {new Date(
                    state.singleTaskData.createdAt
                  ).toLocaleDateString("en-IN")}
                </span>

              </div>

              <div className="flex justify-between border-b pb-3">

                <span className="text-gray-500">
                  Due
                </span>

                <span className="font-semibold text-red-500">
                  {new Date(
                    state.singleTaskData.dueDate
                  ).toLocaleDateString("en-IN")}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Task ID
                </span>

                <span className="font-semibold text-xs break-all text-right max-w-[60%]">
                  {state.singleTaskData._id}
                </span>

              </div>

            </div>

          </div>

        </div>


                {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-end gap-4">

          <button
            className="
              w-full
              sm:w-auto

              px-6
              py-3

              rounded-xl

              bg-green-600
              hover:bg-green-700

              text-white
              font-semibold

              transition
              duration-300

              shadow-md
              hover:shadow-xl
            "
          >
            ✓ Mark Completed
          </button>

          {/* Edit Button */}
          {decodedToken.id === state.singleTaskData.assignedBy._id &&
          <button
          onClick={() => setEditTaskFormIsOpen(true)}
            className="
              w-full
              sm:w-auto

              px-6
              py-3

              rounded-xl

              bg-blue-600
              hover:bg-blue-700

              text-white
              font-semibold

              transition
              duration-300

              shadow-md
              hover:shadow-xl
            "
          >
            ✏ Edit Task
          </button>
          }

          {/* Delete Button */}
          {decodedToken.id === state.singleTaskData.assignedBy._id && <DeleteTask taskId={state?.singleTaskData?._id}/>}

        </div>

      </div>
    )}

  </section>
);
};

export default SingleTask;