import React, { useState } from "react";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Later: API call
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
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          {/* Footer */}
          <p className="text-sm text-center text-base-content/60">
            Don’t have an account?{" "}
            <span className="link link-primary cursor-pointer">Sign up</span>
          </p>
        </div>
      </Card>
    </div>
  );
}

export default Login;
