import api from "../api/axios";

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};


export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};