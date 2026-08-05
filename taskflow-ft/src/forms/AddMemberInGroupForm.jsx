import { useReducer, useContext, useState } from "react";
import axios from "axios";
import { ToggleFormShowContext } from "../context/ToggleFormContext";
import { GroupDetailFetchContext } from "../context/GroupDetailFetchContext";
import api from "../services/axios";

const InitialState = {
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
      return InitialState;

    default:
      return state;
  }
};

function AddMemberInGroupForm() {
  const [ state, dispatch ] = useReducer(reducer, InitialState);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState("");
  const [ show, setShow ] = useState(false);
console.log(show)
  const { AddMemberFormClose } = useContext(ToggleFormShowContext);

  const { groupDetail } = useContext(GroupDetailFetchContext);

  const groupId = groupDetail?._id;

  function handleChange(e) {
    dispatch({
      type: "SET_FIELD",
      name: e.target.name,
      value: e.target.value,
    });

    if (error) setError("");
  }

  async function addMemberInGroup(e) {
    e.preventDefault();

    if (!state.username.trim()) {
      setError("Username is required");
      return;
    }

    try {
      setLoading(true);

      // const res = await axios.patch(
      //   `http://localhost:8080/group/${groupId}/add-member`,
      //   {
      //     username: state.username.trim(),
      //   }
      // );
      const res = await api.patch(
        `/group/${groupId}/add-member`,
        {
          username: state.username.trim(),
        }
      );

      dispatch({ type: "RESET" });

      AddMemberFormClose();
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Failed to add member"
      );

      console.log(error);
    } finally {
      setLoading(false);
    }
  }

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
          relative

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
              Add Member
            </h2>

            <p
              className="
                text-xs
                sm:text-sm

                text-gray-500
                mt-1
              "
            >
              Invite a member to join this group
            </p>
          </div>

          <button
            onClick={AddMemberFormClose}
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
          onSubmit={addMemberInGroup}
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
              Username
            </label>

            <input
              type="text"
              name="username"
              value={state.username}
              onFocus={() => setShow(true)}
              onChange={handleChange}
              placeholder="Enter username"
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
              ? "Adding Member..."
              : "Add Member"}
          </button>
        </form>
          {show && <div className="border ">jdslkfjslkfjsdlfjlskfjsaklfjslkdfjlsdkf</div>}
      </div>
    </div>
  );
}

export default AddMemberInGroupForm;