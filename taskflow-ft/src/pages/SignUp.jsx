import React, { useState, useReducer } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../services/axios";

const initialState = {
  username: "",
  name: "",
  email: "",
  mob: "",
  password: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DETAIL":
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

const SignUp = () => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );

  const [error, setError] = useState("");
  const [lowerCaseError, setLowerCaseError] =
    useState("");
  const [showPassword, setShowPassword] =
    useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //============== Handle Change for set the Field ==============// 
  function handleChange(e) {
    const { name, value } = e.target;

    setError("");
    setLowerCaseError("");

    if (
      name === "username" &&
      value !== value.toLowerCase()
    ) {
      setLowerCaseError(
        "Username must be lowercase only"
      );
    }

    dispatch({
      type: "SET_DETAIL",
      name,
      value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (lowerCaseError) return;

    setLoading(true);

    try {
      // const res = await axios.post(
      //   "http://localhost:8080/signup",
      //   state
      // );
      const res = await api.post("/signup", state)

      dispatch({ type: "RESET" });

      if (res.status === 201 || res.status === 200) {
        navigate("/signin");
      }
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        "Unable to create account";

      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        min-h-screen

        flex
        items-center
        justify-center

        bg-gradient-to-br
        from-blue-50
        via-white
        to-indigo-100

        px-4
        py-10
      "
    >
      <div
        className="
          w-full
          max-w-lg

          bg-white/80
          backdrop-blur-lg

          rounded-3xl

          shadow-xl

          border
          border-white

          p-6
          md:p-8
        "
      >
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <img
            src="/taskflow_logo1.png"
            alt="TaskFlow"
            className="h-14 object-contain"
          />
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1
            className="
              text-3xl
              md:text-4xl

              font-bold

              text-gray-800
            "
          >
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Join TaskFlow and start managing
            your team efficiently.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Username */}
          <div>
            <label
              className="
                text-sm
                font-medium
                text-gray-700
              "
            >
              Username
            </label>

            <input
              type="text"
              name="username"
              value={state.username}
              placeholder="username"
              required
              onChange={handleChange}
              className="
                w-full
                mt-2

                px-4
                py-3

                border
                border-gray-300

                rounded-xl

                focus:ring-2
                focus:ring-blue-500
                focus:outline-none
              "
            />

            {lowerCaseError && (
              <p
                className="
                  text-red-500
                  text-sm
                  mt-2
                "
              >
                {lowerCaseError}
              </p>
            )}
          </div>

          {/* Name */}
          <div>
            <label
              className="
                text-sm
                font-medium
                text-gray-700
              "
            >
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={state.name}
              placeholder="Enter full name"
              required
              onChange={handleChange}
              className="
                w-full
                mt-2

                px-4
                py-3

                border
                border-gray-300

                rounded-xl

                focus:ring-2
                focus:ring-blue-500
                focus:outline-none
              "
            />
          </div>

          {/* Email */}
          <div>
            <label
              className="
                text-sm
                font-medium
                text-gray-700
              "
            >
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={state.email}
              placeholder="Enter email"
              required
              onChange={handleChange}
              className="
                w-full
                mt-2

                px-4
                py-3

                border
                border-gray-300

                rounded-xl

                focus:ring-2
                focus:ring-blue-500
                focus:outline-none
              "
            />
          </div>

          {/* Mobile */}
          <div>
            <label
              className="
                text-sm
                font-medium
                text-gray-700
              "
            >
              Mobile Number
            </label>

            <input
              type="tel"
              name="mob"
              value={state.mob}
              placeholder="Enter mobile number"
              required
              onChange={handleChange}
              className="
                w-full
                mt-2

                px-4
                py-3

                border
                border-gray-300

                rounded-xl

                focus:ring-2
                focus:ring-blue-500
                focus:outline-none
              "
            />
          </div>

          {/* Password */}
          <div>
            <label
              className="
                text-sm
                font-medium
                text-gray-700
              "
            >
              Password
            </label>

            <div className="relative mt-2">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                value={state.password}
                placeholder="Enter password"
                required
                onChange={handleChange}
                className="
                  w-full

                  px-4
                  py-3

                  border
                  border-gray-300

                  rounded-xl

                  focus:ring-2
                  focus:ring-blue-500
                  focus:outline-none
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2

                  text-gray-500
                "
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              className="
                bg-red-50
                border
                border-red-200

                text-red-600

                text-sm

                rounded-xl
                p-3
              "
            >
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full

              py-3

              rounded-xl

              bg-green-600
              text-white

              font-semibold

              hover:bg-green-700

              transition

              disabled:opacity-60
            "
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?
          </p>

          <Link
            to="/signin"
            className="
              text-blue-600
              font-semibold

              hover:text-blue-700
            "
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;