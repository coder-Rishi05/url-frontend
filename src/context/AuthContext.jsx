import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, loginUser } from "../lib/api";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
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

const login = async (credentials) => {
  try {
    await loginUser(credentials);
    const data = await getCurrentUser();
    setUser(data.user ? data.user : data);
  } catch (error) {
    throw error;
  }
};
  // 🔹 Logout function
  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 🔹 Custom hook for cleaner usage
export const useAuth = () => {
  return useContext(AuthContext);
};
