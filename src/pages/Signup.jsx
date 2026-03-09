import React, { useState } from "react";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { signupUser } from "../lib/api";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupUser({ firstname: firstName, email, password });
      toast.success("Account created!");
      navigate("/login");
    } catch (error) {
      setErr(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <Card className="w-full max-w-md">
        <div className="space-y-6">
          {/* Heading */}
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Create Account
            </h1>
            <p className="text-sm text-base-content/60 mt-1">
              Sign up to get started
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {err && <p className="text-error text-sm">{err}</p>}

            <Input
              label="First Name"
              type="text"
              name="firstName"
              placeholder="Enter your name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />

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
              Sign Up
            </Button>
          </form>

          {/* Footer */}
          <p className="text-sm text-center text-base-content/60">
            Already have an account?{" "}
            <span
              className="link link-primary cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Signup;