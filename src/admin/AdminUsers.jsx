import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  updateUserRole,
  updateUserStatus,
  updateUserCredits,
} from "../lib/api";
import toast from "react-hot-toast";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creditInputs, setCreditInputs] = useState({});

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // TODO: implement role toggle logic
  const handleRoleToggle = async (user) => {
    let newRole;
    user.role === "admin" ? (newRole = "user") : (newRole = "admin");
    try {
      const res = await updateUserRole(user._id, newRole);
      console.log(res.message);
      toast.success(res.message);
      loadUsers();
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    }
  };

  // TODO: implement status toggle logic
  const handleStatusToggle = async (user) => {
    // call updateUserStatus
    // on success: loadUsers()
  };

  // TODO: implement credits add logic
  const handleCreditsAdd = async (userId) => {
    // get value from creditInputs[userId]
    // call updateUserCredits
    // on success: loadUsers(), reset input
  };

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );

  if (users.length === 0)
    return (
      <p className="text-center text-base-content/40 py-10 tracking-widest text-sm">
        NO USERS FOUND
      </p>
    );

  return (
    <div className="space-y-3">
      {users.map((user) => {
        const remaining = user.credits.total - user.credits.used;

        return (
          <div
            key={user._id}
            className="bg-base-200 border border-base-300 rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-4"
          >
            {/* Avatar + Info */}
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm flex-shrink-0">
                {user.firstname?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-sm">{user.firstname}</p>
                <p className="text-xs text-base-content/50">{user.email}</p>
              </div>
            </div>

            {/* Credits Info */}
            <div className="flex gap-4 text-xs text-base-content/60">
              <span>
                Total:{" "}
                <span className="text-base-content font-mono font-bold">
                  {user.credits.total}
                </span>
              </span>
              <span>
                Used:{" "}
                <span className="text-base-content font-mono font-bold">
                  {user.credits.used}
                </span>
              </span>
              <span>
                Left:{" "}
                <span
                  className={`font-mono font-bold ${remaining === 0 ? "text-error" : remaining < 5 ? "text-warning" : "text-success"}`}
                >
                  {remaining}
                </span>
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 items-center">
              {/* Role Toggle */}
              <button
                onClick={() => handleRoleToggle(user)}
                className={`btn btn-xs ${user.role === "admin" ? "btn-warning" : "btn-outline"}`}
              >
                {user.role === "admin" ? "Make User" : "Make Admin"}
              </button>

              {/* Status Toggle */}
              <button
                onClick={() => handleStatusToggle(user)}
                className={`btn btn-xs ${user.isActive ? "btn-error btn-outline" : "btn-success btn-outline"}`}
              >
                {user.isActive ? "Deactivate" : "Activate"}
              </button>

              {/* Credits Add */}
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="1"
                  placeholder="Credits"
                  value={creditInputs[user._id] || ""}
                  onChange={(e) =>
                    setCreditInputs((prev) => ({
                      ...prev,
                      [user._id]: Number(e.target.value),
                    }))
                  }
                  className="input input-xs input-bordered w-20 font-mono"
                />
                <button
                  onClick={() => handleCreditsAdd(user._id)}
                  className="btn btn-xs btn-primary"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminUsers;
