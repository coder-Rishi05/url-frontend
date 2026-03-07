import { Routes, Route, Navigate } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";
import AdminBoard from "./admin/AdminBoard";
import AdminRoute from "./components/auth/AdminRoute";

function App() {
  return (
    <div data-theme="forest" className="min-h-screen">
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

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
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
