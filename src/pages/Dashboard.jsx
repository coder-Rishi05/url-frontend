import React, { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import CreateUrl from "../components/CreateUrl";
import UrlTable from "../components/UrlTable";
import { useAuth } from "../context/AuthContext";
import { fetchUserUrls, requestApi } from "../lib/api";
import toast from "react-hot-toast";

function Dashboard() {
  const { user } = useAuth();
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUrls = async () => {
    try {
      setLoading(true);
      const data = await fetchUserUrls();
      setUrls(data.data || []);
    } catch (error) {
      toast.error("Failed to fetch URLs");
    } finally {
      setLoading(false);
    }
  };

  const getMoreCredits = async () => {
    try {
      const data = await requestApi(10);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    loadUrls();
  }, []);

  const remainingCredits = user?.credits?.total - user?.credits?.used;

  return (
    <div className="min-h-screen bg-base-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">

        {/* Header Card */}
        <Card>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                Welcome back, {user?.firstname} 👋
              </h1>
              <p className="text-sm text-base-content/50 mt-0.5">
                Manage and track your shortened URLs
              </p>
            </div>

            <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
              <div className="btn btn-outline btn-primary btn-sm sm:btn-md pointer-events-none">
                🪙 Credits: {remainingCredits}
              </div>
              <button
                onClick={getMoreCredits}
                className="btn btn-success btn-sm sm:btn-md"
              >
                + Add 10 Credits
              </button>
            </div>
          </div>
        </Card>

        {/* Create URL */}
        <Card>
          <h2 className="text-base font-semibold mb-4 text-base-content/80 uppercase tracking-widest text-xs">
            Shorten a URL
          </h2>
          <CreateUrl onSuccess={loadUrls} />
        </Card>

        {/* URL Table */}
        <Card>
          <h2 className="text-base font-semibold mb-4 text-base-content/80 uppercase tracking-widest text-xs">
            Your URLs
          </h2>
          <UrlTable urls={urls} loading={loading} onRefresh={loadUrls} />
        </Card>

      </div>
    </div>
  );
}

export default Dashboard;