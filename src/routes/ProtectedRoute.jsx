import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // Not logged in
  if (!user || !user.token) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
