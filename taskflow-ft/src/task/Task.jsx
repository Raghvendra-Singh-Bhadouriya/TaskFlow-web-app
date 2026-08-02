//======== Show all task in group ========//

import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const initialState = {
  taskData: [],
  loading: true,
  error: "",
};

const reducer = (state, action) => {
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
        taskData: action.payload,
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
};

const Task = () => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );

  const { groupId } = useParams();

  async function fetchTask(groupId) {
    dispatch({ type: "FETCH_START" });

    try {
      const res = await axios.get(
        `http://localhost:8080/all_task/${groupId}`
      );

      dispatch({
        type: "FETCH_SUCCESS",
        payload: res?.data?.data || [],
      });
    } catch (error) {
      dispatch({
        type: "FETCH_ERROR",
        payload:
          error?.response?.data?.message ||
          "Failed to load tasks",
      });
    }
  }

  useEffect(() => {
    if (groupId) {
      fetchTask(groupId);
    }
  }, [groupId]);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";

      case "in-progress":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  if (state.loading) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-gray-500">
          Loading tasks...
        </p>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl">
        {state.error}
      </div>
    );
  }

  return (
    <>
      {state.taskData.length === 0 ? (
        <div
          className="
            bg-gray-50

            rounded-2xl

            p-10

            text-center
          "
        >
          <h2 className="text-xl font-semibold text-gray-700">
            No Tasks Yet
          </h2>

          <p className="text-gray-500 mt-2">
            Create your first task to get
            started.
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

            mt-5
          "
        >
          {state.taskData.map((task) => (
            <Link to={`/group/single-task/${task._id}`}>
            <div
              key={task._id}
              className="
                bg-white

                border border-gray-100

                rounded-2xl

                p-5

                shadow-md
                hover:shadow-xl

                transition-all
                duration-300

                hover:-translate-y-1
              "
            >
              {/* Header */}
              <div className="flex justify-between items-start gap-3">
                <h2
                  className="
                    text-lg

                    font-bold

                    text-gray-800

                    line-clamp-2
                  "
                >
                  {task.title}
                </h2>

                <span
                  className={`
                    px-3 py-1

                    rounded-full

                    text-xs
                    font-medium

                    whitespace-nowrap

                    ${getStatusColor(
                      task.status
                    )}
                  `}
                >
                  {task.status}
                </span>
              </div>

              {/* Description */}
              <p
                className="
                  text-gray-600

                  text-sm

                  mt-3

                  line-clamp-1
                "
              >
                {task.description}
              </p>

              {/* Footer */}
              <div
                className="
                  mt-5

                  pt-4

                  border-t border-gray-100

                  space-y-2
                "
              >
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">
                    Due Date
                  </span>

                  <span className="text-sm font-medium">
                    {new Date(
                      task.dueDate
                    ).toLocaleDateString(
                      "en-IN"
                    )}
                  </span>
                </div>

                {task.username && (
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">
                      Assigned To
                    </span>

                    <span className="text-sm font-medium text-blue-600">
                      @{task.username}
                    </span>
                  </div>
                )}
              </div>
            </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Task;