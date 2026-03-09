import React, { useEffect, useState } from "react";
import { getAllUsers } from "../lib/api";
import AdminUsers from "./AdminUsers";
import toast from "react-hot-toast";
import AdminUrls from "./AdminUrls";
import AdminCreditReqs from "./AdminCreditReqs";

const TABS = ["Overview", "Users", "Credit Requests", "URLs"];

const AdminBoard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");

  const loadUsers = async () => {
    setLoading(true);
    setVisible(false);
    try {
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
    loadUsers();
  }, []);

  const totalCredits = users.reduce((sum, u) => sum + u.credits.total, 0);
  const totalUsed = users.reduce((sum, u) => sum + u.credits.used, 0);
  const adminCount = users.filter((u) => u.role === "admin").length;
  const activeCount = users.filter((u) => u.isActive).length;

  const statCards = [
    { label: "Total Users", value: users.length, color: "text-primary" },
    { label: "Admins", value: adminCount, color: "text-warning" },
    { label: "Active Users", value: activeCount, color: "text-success" },
    { label: "Credits Issued", value: totalCredits, color: "text-info" },
    { label: "Credits Used", value: totalUsed, color: "text-error" },
    { label: "Credits Remaining", value: totalCredits - totalUsed, color: "text-success" },
  ];

  return (
    <div className="min-h-screen bg-base-100" style={{ fontFamily: "'DM Mono', monospace" }}>

      {/* Navbar */}
      <div className="navbar bg-base-200 border-b border-base-300 px-4 sm:px-8 shadow-sm">
        <div className="flex-1 flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
          <span className="text-base sm:text-xl font-bold tracking-widest uppercase">
            Admin Console
          </span>
        </div>
        <span className="badge badge-outline badge-md tracking-widest text-xs sm:text-sm px-3">
          SHORTIFY
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`btn btn-sm sm:btn-md rounded-xl tracking-widest text-xs sm:text-sm ${
                activeTab === tab ? "btn-primary" : "btn-ghost"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "Overview" && (
          <div
            className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            {statCards.map((stat, i) => (
              <div
                key={stat.label}
                className="bg-base-200 border border-base-300 rounded-2xl p-5 sm:p-7 flex flex-col gap-2"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.4s ease ${i * 0.07}s, transform 0.4s ease ${i * 0.07}s`,
                }}
              >
                <span className="text-xs sm:text-sm text-base-content/50 tracking-widest uppercase">
                  {stat.label}
                </span>
                {loading ? (
                  <span className="loading loading-spinner loading-md mt-1" />
                ) : (
                  <span className={`text-4xl sm:text-5xl font-bold ${stat.color}`}>
                    {stat.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "Users" && <AdminUsers />}

        {/* Credit Requests Tab */}
        {activeTab === "Credit Requests" && (
          <div className="text-center py-20 text-base-content/40 tracking-widest text-sm">
            <AdminCreditReqs />
          </div>
        )}

        {/* URLs Tab */}
        {activeTab === "URLs" && (
          <div className="text-center py-20 text-base-content/40 tracking-widest text-sm">
            <AdminUrls />
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminBoard;