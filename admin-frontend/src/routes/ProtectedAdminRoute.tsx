import { Navigate, Outlet, useLocation } from "react-router-dom";

export function ProtectedAdminRoute() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();

  if (!token || role !== "admin") {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
}
