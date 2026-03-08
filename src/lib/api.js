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

// admin apis Users

export const getAllUsers = async () => {
  const res = await api.get("/api/admin/users");
  return res.data;
};

export const updateUserStatus = async (id, status) => {
  const res = await api.patch(`/api/admin/users/${id}/status`, {
    isActive: status,
  });
  return res.data;
};
export const updateUserRole = async (id, role) => {
  const res = await api.patch(`/api/admin/users/${id}/role`, { role: role });
  return res.data;
};
export const updateUserCredits = async (id, credits) => {
  const res = await api.patch(`/api/admin/users/${id}/credits`, {
    credits: credits,
  });
  return res.data;
};

// stats

export const adminStats = async () => {
  const res = await api.get("/api/admin/stats");
  return res.data;
};

// get urls

export const getUrls = async () => {
  const res = await api.get("/api/admin/urls");
  return res.data;
};

export const deleteUrls = async (id) => {
  const res = await api.delete(`/api/admin/urls/${id}`);
  return res.data;
};

// credit request

export const getUserCreditRequests = async () => {
  const res = await api.get("/api/admin/credit-requests");
  return res.data;
};
export const approveUserCreditRequests = async (id) => {
  const res = await api.patch(`/api/admin/credit-requests/${id}/approve`);
  return res.data;
};

export default api;
