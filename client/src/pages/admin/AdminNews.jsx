import { useEffect, useState } from "react";
import apiClient from "../../api/client.js";
import AdminLayout from "../../components/admin/AdminLayout.jsx";

export default function AdminNews() {
  const [articles, setArticles] = useState([]);
  const [liveApiConfigured, setLiveApiConfigured] = useState(true);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState("");

  const load = () => {
    setLoading(true);
    apiClient
      .get("/news/admin")
      .then((res) => {
        setArticles(res.data.articles);
        setLiveApiConfigured(res.data.liveApiConfigured);
      })
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const refresh = async () => {
    setRefreshing(true);
    setMessage("");
    try {
      const res = await apiClient.post("/news/refresh", {});
      setMessage(res.data.liveApiConfigured ? "Refreshed from NewsAPI." : "NEWS_API_KEY not set - no live fetch performed.");
      load();
    } finally {
      setRefreshing(false);
    }
  };

  const toggleHidden = async (article) => {
    await apiClient.put(`/news/${article._id}/hidden`, { hidden: !article.hidden });
    load();
  };

  return (
    <AdminLayout title="News cache">
      {!liveApiConfigured && (
        <div className="rounded-lg border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          NEWS_API_KEY isn't set in the server .env - live fetches will no-op. Add a free key from newsapi.org to enable live updates.
        </div>
      )}

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={refresh}
          disabled={refreshing}
          className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-400 disabled:opacity-60"
        >
          {refreshing ? "Refreshing…" : "Refresh all categories now"}
        </button>
        {message && <span className="text-sm text-slate-400">{message}</span>}
      </div>

      {loading ? (
        <p className="mt-8 text-slate-400">Loading…</p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th scope="col" className="py-2 pr-4">Title</th>
                <th scope="col" className="py-2 pr-4">Category</th>
                <th scope="col" className="py-2 pr-4">Cached</th>
                <th scope="col" className="py-2 pr-4">Status</th>
                <th scope="col" className="py-2 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => (
                <tr key={a._id} className="border-b border-white/5">
                  <td className="py-2 pr-4 text-white">
                    <a href={a.url} target="_blank" rel="noreferrer" className="hover:text-brand-300">
                      {a.title}
                    </a>
                  </td>
                  <td className="py-2 pr-4 text-slate-400">{a.category}</td>
                  <td className="py-2 pr-4 text-slate-400">{new Date(a.cachedAt).toLocaleDateString()}</td>
                  <td className="py-2 pr-4 text-slate-400">{a.hidden ? "Hidden" : "Visible"}</td>
                  <td className="py-2 pr-4">
                    <button onClick={() => toggleHidden(a)} className="text-brand-300 hover:text-brand-200">
                      {a.hidden ? "Unhide" : "Hide"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
