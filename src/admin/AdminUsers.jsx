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
  const [actionLoading, setActionLoading] = useState({});

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

  const setAction = (key, val) =>
    setActionLoading((prev) => ({ ...prev, [key]: val }));

  const handleRoleToggle = async (user) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    setAction(`role-${user._id}`, true);
    try {
      const res = await updateUserRole(user._id, newRole);
      toast.success(res.message);
      loadUsers();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update role");
    } finally {
      setAction(`role-${user._id}`, false);
    }
  };

  const handleStatusToggle = async (user) => {
    const status = !user.isActive;
    setAction(`status-${user._id}`, true);
    try {
      const res = await updateUserStatus(user._id, status);
      toast.success(res.message);
      loadUsers();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    } finally {
      setAction(`status-${user._id}`, false);
    }
  };

  const handleCreditsAdd = async (userId) => {
    const credit = creditInputs[userId];
    setAction(`credit-${userId}`, true);
    try {
      const res = await updateUserCredits(userId, credit);
      toast.success(res.message);
      setCreditInputs((prev) => ({ ...prev, [userId]: "" }));
      loadUsers();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add credits");
    } finally {
      setAction(`credit-${userId}`, false);
    }
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
      {/* Header row */}
      <div className="flex items-center justify-between px-1 pb-2 border-b border-base-300">
        <span className="text-xs tracking-widest uppercase text-base-content/40">
          {users.length} Users
        </span>
        <button
          onClick={loadUsers}
          className="btn btn-xs btn-ghost tracking-widest"
        >
          ↺ Refresh
        </button>
      </div>

      {users.map((user) => {
        const remaining = user.credits.total - user.credits.used;
        const usedPct = user.credits.total
          ? Math.round((user.credits.used / user.credits.total) * 100)
          : 0;

        return (
          <div
            key={user._id}
            className="bg-base-200 border border-base-300 rounded-2xl p-5 flex flex-col gap-4"
          >
            {/* Top row — avatar + info + badges */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm flex-shrink-0">
                {user.firstname?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">
                  {user.firstname}
                </p>
                <p className="text-xs text-base-content/50 truncate">
                  {user.email}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span
                  className={`badge badge-sm ${user.role === "admin" ? "badge-warning" : "badge-ghost"}`}
                >
                  {user.role}
                </span>
                <div className="flex items-center gap-1">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${user.isActive ? "bg-success animate-pulse" : "bg-error"}`}
                  />
                  <span className="text-xs text-base-content/50">
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>

            {/* Credits bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-base-content/50">
                <span>Credits Used</span>
                <span>
                  <span className="font-mono font-bold text-base-content">
                    {user.credits.used}
                  </span>
                  {" / "}
                  <span className="font-mono font-bold text-base-content">
                    {user.credits.total}
                  </span>
                  {"  ·  "}
                  <span
                    className={`font-mono font-bold ${remaining === 0 ? "text-error" : remaining < 5 ? "text-warning" : "text-success"}`}
                  >
                    {remaining} left
                  </span>
                </span>
              </div>
              <div className="w-full h-1.5 bg-base-300 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${usedPct > 80 ? "bg-error" : usedPct > 50 ? "bg-warning" : "bg-success"}`}
                  style={{ width: `${usedPct}%` }}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 items-center pt-1 border-t border-base-300">
              {/* Role Toggle */}
              <button
                onClick={() => handleRoleToggle(user)}
                disabled={actionLoading[`role-${user._id}`]}
                className={`btn btn-xs ${user.role === "admin" ? "btn-warning" : "btn-outline"}`}
              >
                {actionLoading[`role-${user._id}`] ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : user.role === "admin" ? (
                  "Make User"
                ) : (
                  "Make Admin"
                )}
              </button>

              {/* Status Toggle */}
              <button
                onClick={() => handleStatusToggle(user)}
                disabled={actionLoading[`status-${user._id}`]}
                className={`btn btn-xs ${user.isActive ? "btn-error btn-outline" : "btn-success btn-outline"}`}
              >
                {actionLoading[`status-${user._id}`] ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : user.isActive ? (
                  "Deactivate"
                ) : (
                  "Activate"
                )}
              </button>

              {/* Credits Add */}
              <div className="flex items-center gap-1 ml-auto">
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
                  disabled={
                    actionLoading[`credit-${user._id}`] ||
                    !creditInputs[user._id]
                  }
                  className="btn btn-xs btn-primary"
                >
                  {actionLoading[`credit-${user._id}`] ? (
                    <span className="loading loading-spinner loading-xs" />
                  ) : (
                    "+ Add"
                  )}
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
