import React from "react";
import Spinner from "./ui/Spinner";

function UrlTable({ urls, loading }) {
  if (loading) return <Spinner />;

  if (!urls.length)
    return (
      <p className="text-center text-base-content/60">
        No URLs created yet.
      </p>
    );

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Original URL</th>
            <th>Short URL</th>
            <th>Clicks</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => {
            const expired = new Date(url.expiresAt) < new Date();

            return (
              <tr key={url._id}>
                <td className="max-w-xs truncate">
                  {url.originalUrl}
                </td>

                <td>
                  <a
                    href={`http://localhost:3001/api/urls/${url.shortCode}`}
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UrlTable;