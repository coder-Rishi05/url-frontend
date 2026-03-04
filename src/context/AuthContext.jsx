import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, loginUser } from "../lib/api";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch current logged-in user (session restore)
  const fetchCurrentUser = async () => {
    try {
      const data = await getCurrentUser();
      setUser(data.user ? data.user : data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Login
  const login = async (credentials) => {
    try {
      await loginUser(credentials);
      const data = await getCurrentUser();
      setUser(data.user ? data.user : data);

      toast.success("Login successful 🎉");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      throw error;
    }
  };

  // 🔹 Logout
  const logout = async () => {
    try {
      await api.post("/auth/logout"); // no need for withCredentials if configured in axios

      setUser(null);

      toast.success("Logged out successfully");

      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  // 🔹 Run once on app start
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,

    logout,
    refreshUser: fetchCurrentUser, // future credit refresh use
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 🔹 Custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};
