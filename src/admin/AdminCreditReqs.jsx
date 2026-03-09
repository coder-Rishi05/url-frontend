import React, { useEffect, useState } from "react";
import { getUserCreditRequests, approveUserCreditRequests } from "../lib/api";
import toast from "react-hot-toast";

const ReqCardSkeleton = () => (
  <div className="bg-base-200 border border-base-300 rounded-2xl p-4 sm:p-5 flex flex-col gap-3 animate-pulse">
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-base-300 flex-shrink-0" />
        <div className="space-y-2">
          <div className="h-3.5 w-24 bg-base-300 rounded" />
          <div className="h-3 w-32 bg-base-300 rounded" />
        </div>
      </div>
      <div className="h-5 w-16 bg-base-300 rounded-full" />
    </div>
    <div className="flex items-center gap-2 px-1">
      <div className="h-3 w-20 bg-base-300 rounded" />
      <div className="h-6 w-10 bg-base-300 rounded" />
    </div>
  </div>
);

const AdminCreditReqs = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});

  const loadRequests = async () => {
    setLoading(true);
    try {
      const res = await getUserCreditRequests();
      setRequests(res.requests);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  const setAction = (key, val) =>
    setActionLoading((prev) => ({ ...prev, [key]: val }));

  const handleApprove = async (id) => {
    setAction(id, true);
    try {
      const res = await approveUserCreditRequests(id);
      toast.success(res.message);
      loadRequests();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to approve request");
    } finally {
      setAction(id, false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const pendingCount = requests.filter((r) => r.reqStatus === "pending").length;

  if (loading)
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1 pb-2 border-b border-base-300">
          <div className="h-3 w-24 bg-base-300 rounded animate-pulse" />
          <div className="h-6 w-16 bg-base-300 rounded-lg animate-pulse" />
        </div>
        {[...Array(3)].map((_, i) => (
          <ReqCardSkeleton key={i} />
        ))}
      </div>
    );

  if (requests.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <span className="text-4xl">📭</span>
        <p className="text-base-content/40 tracking-widest text-sm uppercase">
          No credit requests found
        </p>
      </div>
    );

  return (
    <div className="space-y-3 text-left">
      {/* Header */}
      <div className="flex items-center justify-between px-1 pb-2 border-b border-base-300">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm tracking-widest uppercase text-base-content/40">
            {requests.length} Requests
          </span>
          {pendingCount > 0 && (
            <span className="badge badge-sm badge-warning">
              {pendingCount} pending
            </span>
          )}
        </div>
        <button
          onClick={loadRequests}
          className="btn btn-xs sm:btn-sm btn-ghost tracking-widest"
        >
          ↺ Refresh
        </button>
      </div>

      {/* Request Cards */}
      {requests.map((req) => (
        <div
          key={req._id}
          className="bg-base-200 border border-base-300 rounded-2xl p-4 sm:p-5 flex flex-col gap-3"
        >
          {/* Top row — avatar + user info + status */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm flex-shrink-0">
                {req.user?.firstname?.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm sm:text-base truncate">
                  {req.user?.firstname}
                </p>
                <p className="text-xs sm:text-sm text-base-content/50 truncate">
                  {req.user?.email}
                </p>
              </div>
            </div>

            <span
              className={`badge badge-sm sm:badge-md shrink-0 ${
                req.reqStatus === "pending"
                  ? "badge-warning"
                  : req.reqStatus === "approved"
                  ? "badge-success"
                  : "badge-error"
              }`}
            >
              {req.reqStatus.toUpperCase()}
            </span>
          </div>

          {/* Credits requested */}
          <div className="flex items-center gap-2 px-1">
            <span className="text-xs sm:text-sm text-base-content/40 tracking-widest uppercase">
              Requested
            </span>
            <span className="font-mono font-bold text-xl sm:text-2xl text-primary">
              +{req.creditRequested}
            </span>
            <span className="text-xs sm:text-sm text-base-content/40">
              credits
            </span>
          </div>

          {/* Approve button — only for pending */}
          {req.reqStatus === "pending" && (
            <div className="flex justify-end pt-1 border-t border-base-300">
              <button
                onClick={() => handleApprove(req._id)}
                disabled={actionLoading[req._id]}
                className="btn btn-xs sm:btn-sm btn-success"
              >
                {actionLoading[req._id] ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  "✓ Approve"
                )}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminCreditReqs;