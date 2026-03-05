import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar/Navbar";
import Card from "../components/ui/Card";
import CreateUrl from "../components/CreateUrl";
import UrlTable from "../components/UrlTable";
import { useAuth } from "../context/AuthContext";
import { fetchUserUrls } from "../lib/api";
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

  useEffect(() => {
    loadUrls();
  }, []);

  const remainingCredits = user?.credits?.total - user?.credits?.used;

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
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
              Credits: {remainingCredits}
            </div>
          </div>
        </Card>
        {/* create url */}
        <Card>
          <CreateUrl onSuccess={loadUrls} />
        </Card>
        {/* create table */}
        <Card>
          <UrlTable urls={urls} loading={loading} onRefresh={loadUrls}  />
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
