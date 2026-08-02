import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const initialState = {
  email: "",
  password: "",
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

const SignIn = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  //============= Handle Change for set the field ================// 
  function handleChange(e) {
    setError("");

    dispatch({
      type: "SET_FIELD",
      name: e.target.name,
      value: e.target.value,
    });
  }

  //============= Handle Submit SignIn ===============//
  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:8080/signin",
        state
      );

      dispatch({ type: "RESET" });

      if (res?.status === 200) {
        localStorage.setItem("token",res.data.access_token);
        setToken(res?.data?.access_token);

        navigate("/dashboard");
      }
    } catch (error) {
      const msg =
        error.response?.data?.message || "Login failed. Please try again.";

      setError(msg);
    } finally {
      setLoading(false);
    };
  };

  //=====Token expiry from localStorage=====//
  useEffect(() => {
    let timer = setTimeout(() => {
      localStorage.removeItem("token");
      setToken(null);
    }, 60*60*1000);

    return () => clearTimeout(timer)
  }, [setToken]);

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
          max-w-md

          bg-white/80
          backdrop-blur-lg

          border
          border-white

          rounded-3xl

          shadow-xl

          p-6
          sm:p-8
        "
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
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
              sm:text-4xl

              font-bold

              text-gray-800
            "
          >
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in to continue using TaskFlow
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="email"
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
              id="email"
              name="email"
              autoComplete="email"
              value={state.email}
              placeholder="Enter your email"
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

                focus:outline-none
                focus:ring-2
                focus:ring-blue-500

                transition
              "
            />
          </div>

          <div>
            <label
              htmlFor="password"
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
                id="password"
                name="password"
                autoComplete="current-password"
                value={state.password}
                placeholder="Enter your password"
                required
                onChange={handleChange}
                className="
                  w-full

                  px-4
                  py-3

                  border
                  border-gray-300

                  rounded-xl

                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500

                  transition
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
                  hover:text-blue-600
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

          {error && (
            <div
              className="
                bg-red-50
                border
                border-red-200

                text-red-600

                text-sm

                p-3

                rounded-xl
              "
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full

              py-3

              rounded-xl

              bg-blue-600
              text-white

              font-semibold

              hover:bg-blue-700

              disabled:opacity-60

              transition
            "
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Don't have an account?
          </p>

          <Link
            to="/signup"
            className="
              text-blue-600
              font-semibold

              hover:text-blue-700
            "
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;