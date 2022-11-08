import user from "../../auth";
import { Navigate } from "react-router-dom";
import { getCookie } from "../../auth";

const ProtectedRoute = ({ level, redirectPath = "/", children }) => {
  const jwt = getCookie("access-token");

  if (jwt === "") {
    return <Navigate to={redirectPath} replace />;
  }
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  if (user.acessLevel !== level && user.acessLevel !== 0) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

export default ProtectedRoute;
