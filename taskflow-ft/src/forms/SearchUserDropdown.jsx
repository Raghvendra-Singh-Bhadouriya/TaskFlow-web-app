import axios from "axios";
import { useEffect, useState } from "react";

const SearchUserDropDown = () => {
  const token = localStorage.getItem("token");

  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addedFriends, setAddedFriends] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim()) {
        searchUser(query);
      } else {
        setSearchData([]);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  async function searchUser(q) {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:8080/search-users?q=${q}`
      );

      setSearchData(res?.data?.data || []);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddFriend(id) {
    try {
      let res = await axios.post(
        `http://localhost:8080/add-friend/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
console.log("res", res)
      if(res.status === 409){
        return console.log("User Already in a friend list")
      }
      if (res.status === 200 || res.status === 201) {
        setAddedFriends((prev) => [...prev, id]);
      }
    } catch (error) {
           console.log("Status:", error.response?.status);
           console.log("Data:", error.response?.data);
         console.log("add friend error", error);
    }
  }

  return (
    <div
      className="
        relative

        w-full
        sm:w-full
        md:w-[80%]
        lg:w-[60%]
        xl:w-[40%]
      "
    >
      {/* Search Input */}
      <div>
        <input
          type="text"
          name="username"
          value={query}
          onFocus={() => setShow(true)}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search users..."
          className="
            w-full

            px-4 py-3

            border border-gray-300
            rounded-2xl

            text-sm
            md:text-base

            outline-none

            focus:ring-4
            focus:ring-blue-100
            focus:border-blue-500

            shadow-sm

            transition
          "
        />
      </div>

      {/* Dropdown */}
      {show && (
        <div
          className="
            absolute
            mt-2

            w-full

            bg-white

            rounded-2xl
            shadow-2xl

            border border-gray-100

            max-h-[400px]
            overflow-y-auto

            z-50
          "
        >
          {loading ? (
            <div className="p-5 text-center text-gray-500">
              Searching...
            </div>
          ) : searchData.length === 0 ? (
            <div className="p-5 text-center text-gray-500">
              No users found
            </div>
          ) : (
            <div className="p-2">
              {searchData.map((user) => (
                <div
                  key={user._id}
                  className="
                    flex items-center justify-between

                    p-3

                    rounded-xl

                    hover:bg-gray-50

                    transition
                  "
                >
                  <div>
                    <p
                      className="
                        font-semibold
                        text-gray-700

                        text-sm
                        md:text-base
                      "
                    >
                      @{user.username}
                    </p>
                  </div>

                  <button
                    onClick={() => handleAddFriend(user._id)}
                    disabled={addedFriends.includes(
                      user._id
                    )}
                    className={`
                      px-4 py-2

                      rounded-xl

                      text-sm
                      font-semibold

                      transition

                      ${
                        addedFriends.includes(user._id)
                          ? "bg-green-500 text-white cursor-default"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }
                    `}
                  >
                    {addedFriends.includes(user._id)
                      ? "Friends"
                      : "Add"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchUserDropDown;