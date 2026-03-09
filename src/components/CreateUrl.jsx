import React, { useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { createUrls } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function CreateUrl({ onSuccess }) {
  const { user, refreshUser } = useAuth();

  const [form, setForm] = useState({
    originalUrl: "",
    customAlias: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const data = await createUrls(form);
      const fullUrl = `${import.meta.env.VITE_API_BASE_URL_Live}/${data.shortCode}`;
      setShortUrl(fullUrl);
      await refreshUser();
      await onSuccess();
      toast.success("Short URL created 🚀");
      setForm({ originalUrl: "", customAlias: "" });
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const remainingCredits = user?.credits?.total - user?.credits?.used;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Original URL"
        name="originalUrl"
        placeholder="https://example.com/very-long-url"
        value={form.originalUrl}
        onChange={handleChange}
        required
      />

      <Input
        label="Custom Alias (Optional)"
        name="customAlias"
        placeholder="my-link"
        value={form.customAlias}
        onChange={handleChange}
      />

      {error && (
        <p className="text-error text-sm font-medium">{error}</p>
      )}

      <Button
        type="submit"
        disabled={loading || remainingCredits <= 0}
        className="w-full"
      >
        {loading ? "Creating..." : "Create Short URL"}
      </Button>

      {remainingCredits <= 0 && (
        <p className="text-error text-sm text-center">
          No credits remaining. Request more from the dashboard.
        </p>
      )}

      {/* Generated Short URL */}
      {shortUrl && (
        <div className="bg-base-200 border border-base-300 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 break-all text-sm font-medium"
          >
            {shortUrl}
          </a>
          <button
            type="button"
            className="btn btn-sm btn-outline shrink-0 self-start sm:self-auto"
            onClick={() => {
              navigator.clipboard.writeText(shortUrl);
              toast.success("Copied! ✅");
            }}
          >
            Copy
          </button>
        </div>
      )}
    </form>
  );
}

export default CreateUrl;