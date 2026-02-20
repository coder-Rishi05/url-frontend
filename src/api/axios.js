import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true, // IMPORTANT for cookie-based auth
});

export default api;