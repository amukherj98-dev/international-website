import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../api/client.js";
import AdminLayout from "../../components/admin/AdminLayout.jsx";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    guides: 0,
    neighbourhoods: 0,
    news: 0,
    feedbackPending: 0,
  });

  useEffect(() => {
    Promise.all([
      apiClient.get("/submissions/admin", { params: { status: "pending" } }),
      apiClient.get("/submissions/admin", { params: { status: "approved" } }),
      apiClient.get("/submissions/admin", { params: { status: "rejected" } }),
      apiClient.get("/guides"),
      apiClient.get("/neighbourhoods"),
      apiClient.get("/news/admin"),
      apiClient.get("/feedback/admin", { params: { status: "pending" } }),
    ]).then(([pending, approved, rejected, guides, neighbourhoods, news, feedbackPending]) => {
      setCounts({
        pending: pending.data.length,
        approved: approved.data.length,
        rejected: rejected.data.length,
        guides: guides.data.length,
        neighbourhoods: neighbourhoods.data.length,
        news: news.data.articles.length,
        feedbackPending: feedbackPending.data.length,
      });
    });
  }, []);

  const cards = [
    { label: "Pending submissions", value: counts.pending, to: "/admin/submissions", highlight: counts.pending > 0 },
    { label: "Approved submissions", value: counts.approved, to: "/admin/submissions" },
    { label: "Pending feedback", value: counts.feedbackPending, to: "/admin/feedback", highlight: counts.feedbackPending > 0 },
    { label: "Guide topics", value: counts.guides, to: "/admin/guides" },
    { label: "Neighbourhoods", value: counts.neighbourhoods, to: "/admin/neighbourhoods" },
    { label: "Cached news articles", value: counts.news, to: "/admin/news" },
  ];

  return (
    <AdminLayout title="Overview">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.label}
            to={c.to}
            className={`rounded-2xl border p-6 transition hover:border-brand-400/40 ${
              c.highlight ? "border-brand-400/40 bg-brand-500/10" : "border-white/10 bg-white/[0.03]"
            }`}
          >
            <p className="text-3xl font-bold text-white">{c.value}</p>
            <p className="mt-1 text-sm text-slate-300">{c.label}</p>
          </Link>
        ))}
      </div>
    </AdminLayout>
  );
}
