import { useState, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import Loading from "./Loading";
import CreateGroupForm from "../forms/CreategroupForm";
import { ToggleFormShowContext } from "../context/ToggleFormContext";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaEllipsisV, FaUsers } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { BiTask } from "react-icons/bi";
import GroupSettings from "../Group/GroupSettings";

const initialState = {
  loading: false,
  data: [],
  error: false,
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
        data: action.payload,
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

const Dashboard = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [ settingPopUpOpen, setSettingPopUpOpen ] = useState(false);
  const [ selectedGroupId, setSelectedGroupId ] = useState(null);

  const { Open } = useContext(ToggleFormShowContext);
  const { decodedToken } = useContext(AuthContext);

  const token = localStorage.getItem("token")

  async function fetchGroups() {
    dispatch({ type: "FETCH_START" });

    try {
      const res = await axios.get(
        "http://localhost:8080/groups",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: "FETCH_SUCCESS",
        payload: res?.data?.data || [],
      });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error?.response?.data?.message });
      console.log("error in get", error?.response?.data?.message);
    }
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  const noGroup = state?.data?.length === 0;

//===== Check the group member is Admin or not =====//
  const currentUserId = decodedToken.id;
  const isAdmin = state?.data?.some((group) => {
    return group?.members?.some(
      (member) => 
        member.userId === currentUserId && member.role === "admin",
    );
});

  function handleSettingPopUp(e, id){
    e.preventDefault();
    e.stopPropagation();
    setSelectedGroupId(id);
    setSettingPopUpOpen(true);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-8">

        <div>
          <h1
            className="
              text-3xl
              md:text-4xl
              font-bold
              text-gray-800
            "
          >
            Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your teams and tasks
            efficiently.
          </p>
        </div>

        <button
          onClick={Open}
          className="
            w-full
            sm:w-auto

            bg-blue-600
            hover:bg-blue-700

            text-white
            font-semibold

            px-6
            py-3

            rounded-xl

            shadow-md
            hover:shadow-lg

            transition-all
            duration-200

            cursor-pointer
          "
        >
          + Create Group
        </button>
      </div>

      {/* CREATE GROUP FORM */}
      <CreateGroupForm fetchGroups={fetchGroups}/>

      {/* STATS SECTION */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3

          gap-5

          mb-8
        "
      >
        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            border
            border-gray-200

            p-6
          "
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">
                Total Groups
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {state.data.length}
              </h2>
            </div>

            <MdOutlineDashboard
              className="
                text-4xl
                text-blue-500
              "
            />
          </div>
        </div>

        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            border
            border-gray-200

            p-6
          "
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">
                Active Teams
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {state.data.length}
              </h2>
            </div>

            <FaUsers
              className="
                text-4xl
                text-green-500
              "
            />
          </div>
        </div>

        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            border
            border-gray-200

            p-6
          "
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">
                Productivity
              </p>

              <h2 className="text-3xl font-bold mt-2">
                100%
              </h2>
            </div>

            <BiTask
              className="
                text-4xl
                text-purple-500
              "
            />
          </div>
        </div>
      </div>

      {/* LOADING */}
      {state.loading && (
        <Loading count={6} />
      )}

      {/* ERROR */}
      {state.error && (
        <div
          className="
            bg-red-50
            border
            border-red-200

            text-red-600

            rounded-xl

            p-4
            text-center
          "
        >
          {state.error?.includes('jwt') ? "Please log in first" : "Failed to load groups"}
        </div>
      )}

      {/* EMPTY STATE */}
      {!state.loading &&
        !state.error &&
        noGroup && (
          <div
            className="
              flex
              flex-col
              items-center
              justify-center

              py-20
            "
          >
            <div className="text-7xl">
              📂
            </div>

            <h2
              className="
                text-3xl
                font-bold

                text-gray-700

                mt-4
              "
            >
              No Groups Yet
            </h2>

            <p
              className="
                text-gray-500

                text-center

                mt-3
                max-w-md
              "
            >
              Create your first group and
              start managing projects,
              teams and tasks.
            </p>

            <button
              onClick={Open}
              className="
                mt-6

                bg-blue-600
                hover:bg-blue-700

                text-white
                font-semibold

                px-6
                py-3

                rounded-xl

                shadow-md

                transition
              "
            >
              Create First Group
            </button>
          </div>
        )}

      {/* GROUP LIST */}
      {!state.loading &&
        !state.error &&
        !noGroup && (
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3

              gap-6
            "
          >
            { settingPopUpOpen && <GroupSettings group_id={selectedGroupId} setSettingPopUpOpen={setSettingPopUpOpen} /> }

            {state.data.map((group) => (
              <div
                key={group._id}
                className="
                  bg-white

                  rounded-2xl

                  border
                  border-gray-200

                  shadow-sm

                  hover:shadow-xl
                  hover:-translate-y-1

                  transition-all
                  duration-300

                  overflow-hidden
                "
              >
                <Link
                  to={`/group/${group._id}`}
                >
                  <div className="p-6">
                    <div
                      className="
                        flex
                        justify-between
                        items-start
                      "
                    >
                      <div>
                        <h2
                          className="
                            text-xl
                            font-bold

                            text-gray-800
                          "
                        >
                          {
                            group.groupname
                          }
                        </h2>

                        <p
                          className="
                            text-sm
                            text-gray-500

                            mt-2
                          "
                        >
                          Team Workspace
                        </p>
                      </div>

                      <button
                        onClick={(e) => handleSettingPopUp(e, group._id)}
                        className="
                          cursor-pointer
                          p-2

                          rounded-lg

                          hover:bg-gray-100

                          transition
                        "
                      >
                        {isAdmin ? !settingPopUpOpen && <FaEllipsisV /> : null}
                      </button>
                    </div>

                    <div
                      className="
                        mt-6
                        pt-4

                        border-t
                        border-gray-100

                        flex
                        justify-between
                        items-center
                      "
                    >
                      <span
                        className="
                          text-sm
                          text-gray-500
                        "
                      >
                        Active Group
                      </span>

                      <span
                        className="
                          bg-green-100
                          text-green-700

                          px-3
                          py-1

                          rounded-full

                          text-xs
                          font-semibold
                        "
                      >
                        Active
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default Dashboard;