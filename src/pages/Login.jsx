import React, { useState } from "react";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import api from "../api/axios";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(
        "/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );

      toast.success(res.data.messgae);
      const token = res.data.token;
      localStorage.setItem("jwt", token);
      navigate("/dashboard")
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <Card className="w-full max-w-md">
        <div className="space-y-6">
          {/* Heading */}
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome Back
            </h1>
            <p className="text-sm text-base-content/60 mt-1">
              Sign in to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          {/* Footer */}
          <p className="text-sm text-center text-base-content/60">
            Don’t have an account?{" "}
            <span
              className="link link-primary cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>
        </div>
      </Card>
    </div>
  );
}

export default Login;
