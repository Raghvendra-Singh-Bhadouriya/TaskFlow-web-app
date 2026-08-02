import { useContext, useReducer, useState } from "react";
import { ToggleFormShowContext } from "../context/ToggleFormContext";
import axios from "axios";

const initialState = {
  groupname: "",
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

const CreateGroupForm = ({fetchGroups}) => {
  const { showForm, Close } =
    useContext(ToggleFormShowContext);

  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

    if (!state.groupname.trim()) {
      setError("Group name is required");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      setLoading(true);
      
      const res = await axios.post(
        "http://localhost:8080/create-group",
        {
          groupname: state.groupname.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(res?.data?.success === true){
        await fetchGroups()
      }

      dispatch({ type: "RESET" });

      Close();
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Failed to create group"
      );

      console.log(
        "Error in create group",
        error?.response?.data?.message
      );
    } finally {
      setLoading(false);
    }
  }

  if (!showForm) return null;

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
          sm:max-w-md
          md:max-w-lg
          lg:max-w-xl

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
            sm:px-5 sm:py-5
            md:px-6
          "
        >
          <div>
            <h2
              className="
                text-lg
                sm:text-xl
                md:text-2xl

                font-bold
                text-gray-800
              "
            >
              Create Group
            </h2>

            <p
              className="
                text-xs
                sm:text-sm

                text-gray-500
                mt-1
              "
            >
              Create a new workspace for your team
            </p>
          </div>

          <button
            onClick={Close}
            className="
              w-8 h-8
              sm:w-10 sm:h-10

              rounded-full

              text-red-500
              font-bold

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
            sm:p-5
            md:p-6

            flex flex-col
            gap-4
          "
        >
          <div>
            <label
              className="
                block

                mb-2

                text-sm
                md:text-base

                font-semibold
                text-gray-700
              "
            >
              Group Name
            </label>

            <input
              type="text"
              name="groupname"
              value={state.groupname}
              placeholder="Enter group name"
              onChange={handleChange}
              className="
                w-full

                px-4 py-3

                text-sm
                md:text-base

                border border-gray-300

                rounded-xl

                outline-none

                focus:ring-4
                focus:ring-blue-100
                focus:border-blue-500

                transition
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

                text-sm
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
              md:py-4

              rounded-xl

              text-sm
              md:text-base

              font-semibold
              text-white

              transition-all
              duration-300

              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
              }
            `}
          >
            {loading
              ? "Creating Group..."
              : "Create Group"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupForm;