import React from "react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="navbar bg-base-100 shadow-md px-6">
      {/* Left Section */}
      <div className="flex-1">
        <span className="text-xl font-bold tracking-wide">🔗 Shortify</span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Credits Display */}
        {user && (
          <div className="badge badge-primary badge-lg">
            Credits: {user.credits}
          </div>
        )}

        {/* Avatar Dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
              {user?.firstname?.charAt(0)?.toUpperCase() || "U"}
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 w-52 rounded-box bg-base-100 shadow-lg"
          >
            <li className="px-2 py-1 text-sm opacity-70">{user?.email}</li>

            <li>
              <button onClick={logout} className="text-error">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
