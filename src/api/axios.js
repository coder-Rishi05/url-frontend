import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
  // baseURL: "https://url-shortner-1-hjjt.onrender.com",
  withCredentials: true,
});

export default api;
