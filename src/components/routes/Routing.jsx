import React from "react";
import { Route, Routes } from "react-router";
import Login from "../Auth/Login";
import Logout from "../Auth/Logout";
import Home from "../Home/Home";

const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
        </Route>
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
};

export default Routing;
