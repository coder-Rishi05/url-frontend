import { Routes, Route, Navigate } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";
import AdminBoard from "./admin/AdminBoard";
import AdminRoute from "./components/auth/AdminRoute";
import Navbar from "./components/NavBar/Navbar";
import AdminUsers from "./admin/AdminUsers";
import Home from "./components/ui/Home";

function App() {
  return (
    <div className="min-h-screen">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#fff",
            border: "1px solid #374151",
          },
        }}
      />
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminDashboard"
          element={
            <AdminRoute>
              <AdminBoard />
            </AdminRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
