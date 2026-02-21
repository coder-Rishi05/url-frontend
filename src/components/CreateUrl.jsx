import React, { useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { createShortUrl } from "../lib/api";
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      await createShortUrl(form);

      await refreshUser();     // 🔥 Refresh credits
      await onSuccess();       // 🔥 Reload URL table

      toast.success("Short URL created successfully 🚀");

      setForm({ originalUrl: "", customAlias: "" });
    } catch (err) {
      const message =
        err.response?.data?.message || "Something went wrong";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const remainingCredits =
    user?.credits?.total - user?.credits?.used;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Original URL"
        name="originalUrl"
        placeholder="https://example.com"
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

      {error && <p className="text-error text-sm">{error}</p>}

      <Button
        type="submit"
        disabled={loading || remainingCredits <= 0}
        className="w-full"
      >
        {loading ? "Creating..." : "Create Short URL"}
      </Button>

      {remainingCredits <= 0 && (
        <p className="text-error text-sm">
          You have no remaining credits.
        </p>
      )}
    </form>
  );
}

export default CreateUrl;