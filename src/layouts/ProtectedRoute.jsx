import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { auth, charging } = useAuth();

  if (charging) return "Charging...";

  return <> {auth._id ? <Outlet /> : <Navigate to="/" />} </>;
};

export default ProtectedRoute;
