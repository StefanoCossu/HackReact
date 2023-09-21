import { Navigate, useLocation } from "react-router-dom";

import useAuthStore from "../store/authStore";

export default function ProtectedRoute({ element }) {
  const location = useLocation();
  const profile = useAuthStore((state) => state.profile);

  return profile ? (
    element
  ) : (
    <Navigate to="/" replace state={{ path: location.pathname }} />
  );
}