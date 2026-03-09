import React, { useEffect, useState } from "react";
import { getUrls, deleteUrls } from "../lib/api";
import toast from "react-hot-toast";

// Shimmer skeleton for a single URL card
const UrlCardSkeleton = () => (
  <div className="bg-base-200 border border-base-300 rounded-2xl p-4 sm:p-5 flex flex-col gap-3 animate-pulse">
    {/* Top row */}
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <div className="h-4 w-24 bg-base-300 rounded" />
        <div className="h-5 w-14 bg-base-300 rounded-full" />
      </div>
      <div className="h-4 w-16 bg-base-300 rounded" />
    </div>
    {/* Original URL */}
    <div className="h-3 w-3/4 bg-base-300 rounded" />
    {/* Bottom row */}
    <div className="flex items-center justify-between pt-1 border-t border-base-300">
      <div className="h-3 w-28 bg-base-300 rounded" />
      <div className="h-6 w-16 bg-base-300 rounded-lg" />
    </div>
  </div>
);

const AdminUrls = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});

  const loadUrls = async () => {
    setLoading(true);
    try {
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
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1 pb-2 border-b border-base-300">
          <div className="h-3 w-16 bg-base-300 rounded animate-pulse" />
          <div className="h-6 w-16 bg-base-300 rounded-lg animate-pulse" />
        </div>
        {[...Array(4)].map((_, i) => (
          <UrlCardSkeleton key={i} />
        ))}
      </div>
    );

  if (urls.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <span className="text-4xl">🔗</span>
        <p className="text-base-content/40 tracking-widest text-sm uppercase">
          No URLs found
        </p>
      </div>
    );

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between px-1 pb-2 border-b border-base-300">
        <span className="text-xs sm:text-sm tracking-widest uppercase text-base-content/40">
          {urls.length} URLs
        </span>
        <button
          onClick={loadUrls}
          className="btn btn-xs sm:btn-sm btn-ghost tracking-widest"
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
            className="bg-base-200 border border-base-300 rounded-2xl p-4 sm:p-5 flex flex-col gap-3"
          >
            {/* Top row — shortcode + badges + clicks */}
            <div className="flex items-start sm:items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2 min-w-0">
                <span className="font-mono font-bold text-primary text-sm sm:text-base">
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
              <div className="flex items-center gap-1 text-xs sm:text-sm text-base-content/50 shrink-0">
                <span>👆</span>
                <span className="font-mono font-bold text-base-content">
                  {url.clickCount}
                </span>
                <span className="hidden sm:inline">clicks</span>
              </div>
            </div>

            {/* Original URL */}
            <p
              className="text-xs sm:text-sm text-base-content/50 truncate"
              title={url.originalUrl}
            >
              <span className="text-base-content/30 mr-1">→</span>
              {url.originalUrl}
            </p>

            {/* Bottom row — expiry + owner + delete */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-base-300">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs sm:text-sm text-base-content/40">
                  Expires:{" "}
                  <span
                    className={`font-mono font-semibold ${
                      expired ? "text-error" : "text-base-content/60"
                    }`}
                  >
                    {formatDate(url.expiresAt)}
                  </span>
                </span>

                {/* Owner name if available */}
                {url.user?.firstname && (
                  <span className="text-xs text-base-content/30">
                    by{" "}
                    <span className="text-base-content/50 font-medium">
                      {url.user.firstname}
                    </span>
                  </span>
                )}
              </div>

              {/* Delete — only for inactive urls */}
              {!url.isActive && (
                <button
                  onClick={() => handleDelete(url._id)}
                  disabled={actionLoading[url._id]}
                  className="btn btn-xs sm:btn-sm btn-error btn-outline"
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