import api from "../api/axios";

export const loginUser = async(data)=>{
  const res = await api.post("/api/auth/login",data)
  return res.data
}

export const signUp = async(data)=>{
  const res = await api.post("/api/auth/signup",data)
  return res.data
}

export const getCurrentUser = async()=>{
  const res = await api.get("/api/auth/me")
  return res.data
}

export const logout = async()=>{
  const res = await api.post("/api/auth/logout")
  return res.data
}