import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../helpers/authHelper";

function ProtectedRoute() {
  

  if (!isAuthenticated) {
    return <Navigate replace to="/alohomora" />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
