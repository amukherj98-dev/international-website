import { useEffect, useState } from "react";
import apiClient from "../../api/client.js";
import AdminLayout from "../../components/admin/AdminLayout.jsx";

const TABS = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

export default function AdminFeedback() {
  const [status, setStatus] = useState("pending");
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    apiClient
      .get("/feedback/admin", { params: { status } })
      .then((res) => setFeedback(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(load, [status]);

  const approve = async (id) => {
    await apiClient.put(`/feedback/${id}/approve`);
    load();
  };

  const reject = async (id) => {
    await apiClient.put(`/feedback/${id}/reject`);
    load();
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this feedback permanently?")) return;
    await apiClient.delete(`/feedback/${id}`);
    load();
  };

  return (
    <AdminLayout title="Feedback">
      <div role="tablist" aria-label="Feedback status" className="flex gap-2">
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
      ) : feedback.length === 0 ? (
        <p className="mt-8 text-slate-500">No {status} feedback.</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {feedback.map((f) => (
            <li key={f._id} className="rounded-xl border border-slate-900/10 bg-white/80 backdrop-blur-sm p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <span>{f.name || "Anonymous"}</span>
                <time dateTime={f.createdAt}>{new Date(f.createdAt).toLocaleString()}</time>
              </div>
              <p className="mt-2 whitespace-pre-line text-sm text-slate-800">{f.message}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {status !== "approved" && (
                  <button onClick={() => approve(f._id)} className="rounded-full bg-brand-500 px-4 py-1.5 text-sm font-semibold text-white hover:bg-brand-400">
                    Approve
                  </button>
                )}
                {status !== "rejected" && (
                  <button onClick={() => reject(f._id)} className="rounded-full border border-amber-400/40 px-4 py-1.5 text-sm text-amber-700 hover:bg-amber-500/10">
                    Reject
                  </button>
                )}
                <button onClick={() => remove(f._id)} className="rounded-full border border-red-400/30 px-4 py-1.5 text-sm text-red-700 hover:bg-red-500/10">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </AdminLayout>
  );
}
