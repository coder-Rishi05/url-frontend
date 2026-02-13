import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleClick = async()=>{
    
  }

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
        <input type="email" className="input" placeholder="Email" />

        <label className="label">Password</label>
        <input type="password" className="input" placeholder="Password" />

        <button className="btn btn-neutral mt-4">Login</button>
      </fieldset>
    </div>
  );
};

export default Login;
