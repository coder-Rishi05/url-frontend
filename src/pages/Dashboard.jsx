import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar/Navbar";
import Card from "../components/ui/Card";
import CreateUrl from "../components/CreateUrl";
import UrlTable from "../components/UrlTable";
import { useAuth } from "../context/AuthContext";
import { fetchUserUrls } from "../lib/api";

function Dashboard() {
  const { user, login } = useAuth();
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUrls = async () => {
    try {
      const data = await fetchUserUrls();
      setUrls(data.data);
    } catch (error) {
      console.error("Failed to fetch URLs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUrls();
  }, []);

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">

        {/* Welcome + Credits */}
        <Card>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">
                Welcome, {user?.firstname} 👋
              </h1>
              <p className="text-sm text-base-content/60">
                Manage your shortened URLs
              </p>
            </div>

            <div className="badge badge-primary badge-lg">
              Credits: {user?.credits?.total - user?.credits?.used}
            </div>
          </div>
        </Card>

        {/* Create URL */}
        <Card>
          <CreateUrl onSuccess={loadUrls} />
        </Card>

        {/* URL Table */}
        <Card>
          <UrlTable urls={urls} loading={loading} />
        </Card>

      </div>
    </div>
  );
}

export default Dashboard;