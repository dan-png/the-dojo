import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({ user, redirectPath, children }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />
  }

  return children ? children : <Outlet />
}