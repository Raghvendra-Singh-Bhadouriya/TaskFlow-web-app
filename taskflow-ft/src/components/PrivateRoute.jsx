import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } =
    useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="h-12 w-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return isAuthenticated ? (
    children
  ) : (
    <Navigate
      to="/signin"
      replace
    />
  );
};

export default PrivateRoute;