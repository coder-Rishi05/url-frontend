import React, { useEffect, useState } from "react";
import { getAllUsers } from "../lib/api";
import toast from "react-hot-toast";

const AdminBoard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const loadUser = async () => {
    try {
      setLoading(true); // ye add karo
      setVisible(false); // ye add karo
      const data = await getAllUsers();
      setUsers(data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
      setTimeout(() => setVisible(true), 50);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const totalCredits = users.reduce((sum, u) => sum + u.credits.total, 0);
  const totalUsed = users.reduce((sum, u) => sum + u.credits.used, 0);
  const adminCount = users.filter((u) => u.role === "admin").length;

  return (
    <div
      className="min-h-screen bg-base-100"
      style={{ fontFamily: "'DM Mono', monospace" }}
    >
      {/* Top bar */}
      <div className="navbar bg-base-200 border-b border-base-300 px-6 shadow-sm">
        <div className="flex-1 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-lg font-bold tracking-widest uppercase text-base-content">
            Admin Console
          </span>
        </div>
        <div className="flex-none">
          <span className="badge badge-outline badge-sm tracking-widest">
            SHORTIFY
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        {/* Stats row */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
          }}
        >
          {[
            {
              label: "Total Users",
              value: users.length,
              color: "text-primary",
            },
            { label: "Admins", value: adminCount, color: "text-warning" },
            {
              label: "Credits Issued",
              value: totalCredits,
              color: "text-success",
            },
            { label: "Credits Used", value: totalUsed, color: "text-error" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="bg-base-200 border border-base-300 rounded-2xl p-5 flex flex-col gap-1"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.4s ease ${i * 0.08}s, transform 0.4s ease ${i * 0.08}s`,
              }}
            >
              <span className="text-xs text-base-content/50 tracking-widest uppercase">
                {stat.label}
              </span>
              <span className={`text-3xl font-bold ${stat.color}`}>
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* Users table */}
        <div
          className="bg-base-200 border border-base-300 rounded-2xl overflow-hidden"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s",
          }}
        >
          {/* Table header */}
          <div className="px-6 py-4 border-b border-base-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-widest uppercase text-base-content/70">
                Users
              </span>
              <span className="badge badge-sm badge-primary">
                {users.length}
              </span>
            </div>
            <button
              onClick={loadUser}
              className="btn btn-xs btn-ghost tracking-widest"
            >
              ↺ Refresh
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <span className="loading loading-spinner loading-lg text-primary" />
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-16 text-base-content/40 tracking-widest text-sm">
              NO USERS FOUND
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr className="text-xs tracking-widest uppercase text-base-content/50">
                    <th>#</th>
                    <th>User</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Credits</th>
                    <th>Used</th>
                    <th>Remaining</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => {
                    const remaining = u.credits.total - u.credits.used;
                    const usedPct = u.credits.total
                      ? Math.round((u.credits.used / u.credits.total) * 100)
                      : 0;

                    return (
                      <tr
                        key={u._id}
                        className="hover transition-colors duration-150"
                        style={{
                          opacity: visible ? 1 : 0,
                          transition: `opacity 0.3s ease ${0.3 + i * 0.06}s`,
                        }}
                      >
                        {/* Index */}
                        <td className="text-base-content/30 text-xs font-mono">
                          {String(i + 1).padStart(2, "0")}
                        </td>

                        {/* User info */}
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                              {u.firstname?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-semibold text-sm">
                                {u.firstname}
                              </div>
                              <div className="text-xs text-base-content/50">
                                {u.email}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Role */}
                        <td>
                          <span
                            className={`badge badge-sm tracking-widest ${
                              u.role === "admin"
                                ? "badge-warning"
                                : "badge-ghost"
                            }`}
                          >
                            {u.role.toUpperCase()}
                          </span>
                        </td>

                        {/* Status */}
                        <td>
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${
                                u.isActive ? "bg-success" : "bg-error"
                              }`}
                            />
                            <span className="text-xs text-base-content/60">
                              {u.isActive ? "Active" : "Inactive"}
                            </span>
                          </div>
                        </td>

                        {/* Credits total */}
                        <td className="font-mono text-sm">{u.credits.total}</td>

                        {/* Used with progress */}
                        <td>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm">
                              {u.credits.used}
                            </span>
                            <div className="w-16 h-1 bg-base-300 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-700 ${
                                  usedPct > 80
                                    ? "bg-error"
                                    : usedPct > 50
                                      ? "bg-warning"
                                      : "bg-success"
                                }`}
                                style={{ width: `${usedPct}%` }}
                              />
                            </div>
                          </div>
                        </td>

                        {/* Remaining */}
                        <td>
                          <span
                            className={`font-mono text-sm font-bold ${
                              remaining === 0
                                ? "text-error"
                                : remaining < 5
                                  ? "text-warning"
                                  : "text-success"
                            }`}
                          >
                            {remaining}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBoard;
