import { Navigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../ui/Spinner";

function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;

  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== "admin") return <Navigate to="/admindashboard" />;

  return children;
}
export default AdminRoute;
