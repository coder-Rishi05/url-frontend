import React, { useState } from "react";
import Spinner from "./ui/Spinner";
import toast from "react-hot-toast";

function UrlTable({ urls, loading }) {
  const [copiedId, setCopiedId] = useState(null);

  if (loading) return <Spinner />;

  if (!urls.length)
    return (
      <p className="text-center text-base-content/60">
        No URLs created yet.
      </p>
    );

  const handleCopy = async (shortCode, id) => {
    try {
      const shortUrl = `${import.meta.env.VITE_API_BASE_URL}/${shortCode}`;

      await navigator.clipboard.writeText(shortUrl);

      setCopiedId(id);
      toast.success("Link copied to clipboard 🚀");

      setTimeout(() => {
        setCopiedId(null);
      }, 1500);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Original URL</th>
            <th>Short URL</th>
            <th>Clicks</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {urls.map((url) => {
            const expired = new Date(url.expiresAt) < new Date();

            const shortUrl = `${import.meta.env.VITE_API_BASE_URL}/${url.shortCode}`;

            return (
              <tr key={url._id}>
                <td className="max-w-xs truncate">
                  {url.originalUrl}
                </td>

                <td>
                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="link link-primary"
                  >
                    {url.shortCode}
                  </a>
                </td>

                <td>
                  <span className="badge badge-secondary">
                    {url.clickCount}
                  </span>
                </td>

                <td>
                  <span
                    className={`badge ${
                      expired ? "badge-error" : "badge-success"
                    }`}
                  >
                    {expired ? "Expired" : "Active"}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() =>
                      handleCopy(url.shortCode, url._id)
                    }
                    className="btn btn-xs btn-outline"
                  >
                    {copiedId === url._id ? "Copied!" : "Copy"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UrlTable;