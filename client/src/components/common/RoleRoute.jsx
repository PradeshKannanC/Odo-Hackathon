import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Loader from "./Loader";

const RoleRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loader fullScreen />;

  return allowedRoles.includes(user?.role) ? <Outlet /> : <Navigate to="/forbidden" replace />;
};

export default RoleRoute;
