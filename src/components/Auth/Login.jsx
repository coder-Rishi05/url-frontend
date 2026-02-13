import axios from "axios";
import { useState } from "react";
import { redirect } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      if (res) {
        redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center pt-20 justify-center">
      <fieldset
        data-theme="coffe"
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
      >
        <h1 className="fieldset-legend text-2xl font-bold text-center ">
          Login
        </h1>

        <label className="label">Email</label>
        <input
          value={email}
          type="email"
          className="input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label">Password</label>
        <input
          value={password}
          type="password"
          className="input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-neutral mt-4" onClick={handleClick}>
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
