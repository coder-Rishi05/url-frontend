import React, { useState } from "react";

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
    <div>
      <form onSubmit={handleSubmit} action="">
        {err && <p>{err}</p>}
        <input
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter your name"
          value={firstName}
        />
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          value={email}
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          value={password}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Signup;
