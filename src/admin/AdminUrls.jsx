import React, { useEffect, useState } from "react";
import { getUrls, deleteUrls } from "../lib/api";
import toast from "react-hot-toast";

const AdminUrls = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [actionLoading, setActionLoading] = useState({});

  const loadUrls = async () => {
    setLoading(true);
    try {
      // TODO: call getUrls(), set data.urls into urls state
      const res = await getUrls();
      setUrls(res.urls);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load URLs");
    } finally {
      setLoading(false);
    }
  };

  const setAction = (key, val) =>
    setActionLoading((prev) => ({ ...prev, [key]: val }));

  const handleDelete = async (id) => {
    setAction(id, true);
    try {
      const res = await deleteUrls(id);
      console.log(res.data);
      toast.success(res.message);
      loadUrls();
      // TODO: call deleteUrls(id), toast.success, loadUrls()
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete URL");
    } finally {
      setAction(id, false);
    }
  };

  useEffect(() => {
    loadUrls();
  }, []);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const isExpired = (dateStr) => new Date(dateStr) < new Date();

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );

  if (urls.length === 0)
    return (
      <p className="text-center text-base-content/40 py-10 tracking-widest text-sm">
        NO URLS FOUND
      </p>
    );

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between px-1 pb-2 border-b border-base-300">
        <span className="text-xs tracking-widest uppercase text-base-content/40">
          {urls.length} URLs
        </span>
        <button
          onClick={loadUrls}
          className="btn btn-xs btn-ghost tracking-widest"
        >
          ↺ Refresh
        </button>
      </div>

      {/* URL Cards */}
      {urls.map((url) => {
        const expired = isExpired(url.expiresAt);

        return (
          <div
            key={url._id}
            className="bg-base-200 border border-base-300 rounded-2xl p-5 flex flex-col gap-3"
          >
            {/* Top row — shortcode + status badges */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-primary text-sm">
                  /{url.shortCode}
                </span>
                <span
                  className={`badge badge-sm ${
                    url.isActive ? "badge-success" : "badge-error"
                  }`}
                >
                  {url.isActive ? "Active" : "Inactive"}
                </span>
                {expired && (
                  <span className="badge badge-sm badge-warning">Expired</span>
                )}
              </div>

              {/* Click count */}
              <div className="flex items-center gap-1 text-xs text-base-content/50">
                <span>👆</span>
                <span className="font-mono font-bold text-base-content">
                  {url.clickCount}
                </span>
                <span>clicks</span>
              </div>
            </div>

            {/* Original URL */}
            <div className="text-xs text-base-content/50 truncate">
              <span className="text-base-content/30 mr-1">→</span>
              {url.originalUrl}
            </div>

            {/* Bottom row — expiry + delete */}
            <div className="flex items-center justify-between pt-1 border-t border-base-300">
              <span className="text-xs text-base-content/40">
                Expires:{" "}
                <span
                  className={`font-mono ${expired ? "text-error" : "text-base-content/60"}`}
                >
                  {formatDate(url.expiresAt)}
                </span>
              </span>

              {/* Delete — only for inactive urls */}
              {!url.isActive && (
                <button
                  onClick={() => handleDelete(url._id)}
                  disabled={actionLoading[url._id]}
                  className="btn btn-xs btn-error btn-outline"
                >
                  {actionLoading[url._id] ? (
                    <span className="loading loading-spinner loading-xs" />
                  ) : (
                    "Delete"
                  )}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminUrls;
