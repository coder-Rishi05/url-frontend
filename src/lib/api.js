import api from "../api/axios";

export const getCurrentUser = async () => {
  const response = await api.get(`/auth/me?t=${Date.now()}`);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const createShortUrl = async (data) => {
  const response = await api.post("/urls", data);
  return response.data;
};

export const fetchUserUrls = async () => {
  const response = await api.get("/urls");
  return response.data;
};
