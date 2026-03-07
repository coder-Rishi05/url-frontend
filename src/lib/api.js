import api from "../api/axios";

{
  /* Auth routes */
}

export const loginUser = async (data) => {
  const res = await api.post("/api/auth/login", data);
  return res.data;
};

export const signupUser = async (data) => {
  const res = await api.post("/api/auth/signup", data);
  return res.data;
};

export const logout = async () => {
  const res = await api.post("/api/auth/logout");
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await api.get("/api/auth/me");
  return res.data;
};

{
  /* url routes */
}

export const fetchUserUrls = async () => {
  const res = await api.get("/api/urls/");
  return res.data;
};

export const createUrls = async (userUrls) => {
  const res = await api.post("/api/urls/", userUrls);
  return res.data;
};

export const deactivateUrl = async (id) => {
  const res = await api.patch(`/api/urls/${id}`);
  return res.data;
};

export const requestApi = async (creditAmt) => {
  const res = await api.post(`/api/urls/credits/request`, {
    credits: creditAmt,
  });
  return res.data;
};

export default api;
