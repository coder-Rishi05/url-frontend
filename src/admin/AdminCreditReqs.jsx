import React, { useEffect, useState } from "react";
import { getUserCreditRequests, approveUserCreditRequests } from "../lib/api";
import toast from "react-hot-toast";

const AdminCreditReqs = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});

  const loadRequests = async () => {
    setLoading(true);
    try {
      // TODO: call getUserCreditRequests(), set requests field into state
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
      // TODO: call approveUserCreditRequests(id), toast.success, loadRequests()
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to approve request",
      );
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
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );

  if (requests.length === 0)
    return (
      <p className="text-center text-base-content/40 py-10 tracking-widest text-sm">
        NO CREDIT REQUESTS FOUND
      </p>
    );

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between px-1 pb-2 border-b border-base-300">
        <div className="flex items-center gap-2">
          <span className="text-xs tracking-widest uppercase text-base-content/40">
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
          className="btn btn-xs btn-ghost tracking-widest"
        >
          ↺ Refresh
        </button>
      </div>

      {/* Request Cards */}
      {requests.map((req) => (
        <div
          key={req._id}
          className="bg-base-200 border border-base-300 rounded-2xl p-5 flex flex-col gap-3"
        >
          {/* Top row — user info + status badge */}
          <div className="flex items-center justify-between gap-2">
            {/* Avatar + user info */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm flex-shrink-0">
                {req.user?.firstname?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-sm">{req.user?.firstname}</p>
                <p className="text-xs text-base-content/50">
                  {req.user?.email}
                </p>
              </div>
            </div>

            {/* Status badge */}
            <span
              className={`badge badge-sm ${
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
            <span className="text-xs text-base-content/40 tracking-widest uppercase">
              Requested
            </span>
            <span className="font-mono font-bold text-lg text-primary">
              +{req.creditRequested}
            </span>
            <span className="text-xs text-base-content/40">credits</span>
          </div>

          {/* Bottom row — approve button */}
          {req.reqStatus === "pending" && (
            <div className="flex justify-end pt-1 border-t border-base-300">
              <button
                onClick={() => handleApprove(req._id)}
                disabled={actionLoading[req._id]}
                className="btn btn-xs btn-success"
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
