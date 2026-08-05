import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

function LogoutButton() {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (token) {
      //   await fetch(
      //     "http://localhost:8080/logout",
      //     {
      //       method: "POST",
      //       headers: {
      //         "Content-Type":
      //           "application/json",
      //         Authorization: `Bearer ${token}`,
      //       },
      //     }
      //   );
      await api.post("/logout");
      }

      localStorage.removeItem("token");
      setToken(null);
      navigate("/");
    } catch (error) {
      console.error(
        "Logout failed:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="
        w-full

        flex
        items-center
        justify-center

        gap-2

        px-4
        py-3

        rounded-xl

        border
        border-red-200

        bg-red-50

        text-red-600

        font-semibold

        hover:bg-red-100
        hover:border-red-300

        transition-all
        duration-200

        disabled:opacity-50
        disabled:cursor-not-allowed
      "
    >
      <FaSignOutAlt />

      {loading
        ? "Logging out..."
        : "Logout"}
    </button>
  );
}

export default LogoutButton;