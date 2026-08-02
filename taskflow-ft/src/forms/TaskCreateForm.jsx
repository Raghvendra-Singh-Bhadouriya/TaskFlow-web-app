import React, { useState, useReducer, useContext } from "react";
import axios from "axios";
import { ToggleFormShowContext } from "../context/ToggleFormContext";
import { GroupDetailFetchContext } from "../context/GroupDetailFetchContext";

const initialState = {
  title: "",
  description: "",
  dueDate: "",
  status: "pending",
  username: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.name]: action.value,
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
};

const Form = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    showTaskForm,
    TaskFormClose,
  } = useContext(ToggleFormShowContext);

  const { groupDetail } = useContext(
    GroupDetailFetchContext
  );

  const groupId = groupDetail?._id;

  function handleChange(e) {
    dispatch({
      type: "SET_FIELD",
      name: e.target.name,
      value: e.target.value,
    });

    if (error) setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login again");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `http://localhost:8080/create_task/${groupId}`,
        state,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({ type: "RESET" });

      TaskFormClose();
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Failed to create task"
      );

      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (!showTaskForm) return null;

  return (
    <div
      className="
        fixed inset-0
        z-50

        flex items-center justify-center

        bg-black/40
        backdrop-blur-sm

        p-3
        sm:p-4
        md:p-6
      "
    >
      <div
        className="
          w-full

          max-w-[95%]
          sm:max-w-xl
          md:max-w-2xl
          lg:max-w-3xl

          bg-white

          rounded-2xl
          md:rounded-3xl

          shadow-2xl

          overflow-hidden
        "
      >
        {/* Header */}
        <div
          className="
            flex items-center justify-between

            border-b border-gray-200

            px-4 py-4
            sm:px-6 sm:py-5
          "
        >
          <div>
            <h2
              className="
                text-xl
                md:text-2xl

                font-bold
                text-gray-800
              "
            >
              Create Task
            </h2>

            <p
              className="
                text-sm
                text-gray-500
                mt-1
              "
            >
              Assign a new task to your team
            </p>
          </div>

          <button
            onClick={TaskFormClose}
            className="
              w-10 h-10

              rounded-full

              text-red-500

              hover:bg-red-50

              transition
            "
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="
            p-4
            sm:p-6

            grid

            gap-5
          "
        >
          {/* Title */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Task Title
            </label>

            <input
              type="text"
              name="title"
              value={state.title}
              required
              onChange={handleChange}
              placeholder="Enter task title"
              className="
                w-full

                px-4 py-3

                border border-gray-300
                rounded-xl

                focus:ring-4
                focus:ring-blue-100
                focus:border-blue-500

                outline-none
              "
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Description
            </label>

            <textarea
              name="description"
              value={state.description}
              required
              rows="4"
              onChange={handleChange}
              placeholder="Enter task details..."
              className="
                w-full

                px-4 py-3

                border border-gray-300
                rounded-xl

                focus:ring-4
                focus:ring-blue-100
                focus:border-blue-500

                outline-none
                resize-none
              "
            />
          </div>

          {/* Due Date + Status */}
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-4
            "
          >
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Due Date
              </label>

              <input
                type="date"
                name="dueDate"
                value={state.dueDate}
                required
                onChange={handleChange}
                className="
                  w-full

                  px-4 py-3

                  border border-gray-300
                  rounded-xl

                  focus:ring-4
                  focus:ring-blue-100
                  focus:border-blue-500

                  outline-none
                "
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Status
              </label>

              <select
                name="status"
                value={state.status}
                onChange={handleChange}
                className="
                  w-full

                  px-4 py-3

                  border border-gray-300
                  rounded-xl

                  focus:ring-4
                  focus:ring-blue-100
                  focus:border-blue-500

                  outline-none
                "
              >
                <option value="pending">
                  Pending
                </option>

                <option value="in-progress">
                  In Progress
                </option>

                <option value="completed">
                  Completed
                </option>
              </select>
            </div>
          </div>

          {/* Assignee */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Assign To
            </label>

            <input
              type="text"
              name="username"
              value={state.username}
              placeholder="Enter username"
              onChange={handleChange}
              className="
                w-full

                px-4 py-3

                border border-gray-300
                rounded-xl

                focus:ring-4
                focus:ring-blue-100
                focus:border-blue-500

                outline-none
              "
            />
          </div>

          {error && (
            <div
              className="
                bg-red-50
                border border-red-200

                text-red-600

                px-4 py-3

                rounded-xl
              "
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`
              w-full

              py-3

              rounded-xl

              font-semibold
              text-white

              transition-all

              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
              }
            `}
          >
            {loading
              ? "Assigning Task..."
              : "Assign Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;