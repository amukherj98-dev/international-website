import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../api/client.js";
import AdminLayout from "../../components/admin/AdminLayout.jsx";

const EDIT_PATH = {
  Guide: "/admin/guides",
  Neighbourhood: "/admin/neighbourhoods",
  Story: "/admin/stories",
};

const TABS = [
  { value: "pending", label: "Pending" },
  { value: "resolved", label: "Resolved" },
];

export default function AdminCorrections() {
  const [status, setStatus] = useState("pending");
  const [corrections, setCorrections] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    apiClient
      .get("/corrections", { params: { status } })
      .then((res) => setCorrections(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(load, [status]);

  const resolve = async (id) => {
    await apiClient.put(`/corrections/${id}/resolve`);
    load();
  };

  return (
    <AdminLayout title="Corrections">
      <div role="tablist" aria-label="Correction status" className="flex gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            role="tab"
            aria-selected={status === tab.value}
            onClick={() => setStatus(tab.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${
              status === tab.value ? "bg-brand-500 text-white" : "bg-slate-900/5 text-slate-700 hover:bg-slate-900/10"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="mt-8 text-slate-500">Loading…</p>
      ) : corrections.length === 0 ? (
        <p className="mt-8 text-slate-500">No {status} reports.</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {corrections.map((c) => (
            <li key={c._id} className="rounded-xl border border-slate-900/10 bg-white/80 backdrop-blur-sm p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <span className="font-semibold text-brand-600">{c.contentType}</span>
                <time dateTime={c.createdAt}>{new Date(c.createdAt).toLocaleString()}</time>
              </div>
              <p className="mt-2 whitespace-pre-line text-sm text-slate-800">{c.note}</p>
              {c.submitterEmail && <p className="mt-1 text-xs text-slate-400">From: {c.submitterEmail}</p>}

              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  to={`${EDIT_PATH[c.contentType] || "/admin"}?edit=${c.contentId}`}
                  className="rounded-full border border-brand-400/40 px-4 py-1.5 text-sm text-brand-600 hover:bg-brand-500/10"
                >
                  Edit content
                </Link>
                {status !== "resolved" && (
                  <button
                    onClick={() => resolve(c._id)}
                    className="rounded-full bg-brand-500 px-4 py-1.5 text-sm font-semibold text-white hover:bg-brand-400"
                  >
                    Mark resolved
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </AdminLayout>
  );
}
