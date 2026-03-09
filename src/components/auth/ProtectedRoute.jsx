import { Navigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../ui/Spinner";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
export default ProtectedRoute;
