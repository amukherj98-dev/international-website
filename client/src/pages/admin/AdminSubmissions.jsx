import { useEffect, useState } from "react";
import apiClient from "../../api/client.js";
import AdminLayout from "../../components/admin/AdminLayout.jsx";

const TABS = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

export default function AdminSubmissions() {
  const [status, setStatus] = useState("pending");
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", body: "" });

  const load = () => {
    setLoading(true);
    apiClient
      .get("/submissions/admin", { params: { status } })
      .then((res) => setSubmissions(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(load, [status]);

  const approve = async (id) => {
    await apiClient.put(`/submissions/${id}/approve`);
    load();
  };

  const reject = async (id) => {
    await apiClient.put(`/submissions/${id}/reject`);
    load();
  };

  const startEdit = (submission) => {
    setEditingId(submission._id);
    setEditForm({ title: submission.title, body: submission.body });
  };

  const saveEdit = async (id) => {
    await apiClient.put(`/submissions/${id}`, editForm);
    setEditingId(null);
    load();
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this submission permanently?")) return;
    await apiClient.delete(`/submissions/${id}`);
    load();
  };

  return (
    <AdminLayout title="Submissions">
      <div role="tablist" aria-label="Submission status" className="flex gap-2">
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
      ) : submissions.length === 0 ? (
        <p className="mt-8 text-slate-500">No {status} submissions.</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {submissions.map((s) => (
            <li key={s._id} className="rounded-xl border border-slate-900/10 bg-white/80 backdrop-blur-sm p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <span>
                  {s.name || "Anonymous"} {s.email && `· ${s.email}`} · {s.category}
                </span>
                <time dateTime={s.createdAt}>{new Date(s.createdAt).toLocaleString()}</time>
              </div>

              {editingId === s._id ? (
                <div className="mt-3 space-y-2">
                  <input
                    value={editForm.title}
                    onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))}
                    className="w-full rounded-lg border border-slate-900/10 bg-slate-900/5 px-3 py-2 text-sm text-slate-900"
                  />
                  <textarea
                    value={editForm.body}
                    onChange={(e) => setEditForm((f) => ({ ...f, body: e.target.value }))}
                    rows={5}
                    className="w-full rounded-lg border border-slate-900/10 bg-slate-900/5 px-3 py-2 text-sm text-slate-900"
                  />
                  <div className="flex gap-2">
                    <button onClick={() => saveEdit(s._id)} className="rounded-full bg-brand-500 px-4 py-1.5 text-sm font-semibold text-white">
                      Save
                    </button>
                    <button onClick={() => setEditingId(null)} className="rounded-full border border-slate-900/10 px-4 py-1.5 text-sm text-slate-700">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="mt-2 font-semibold text-slate-900">{s.title}</h3>
                  <p className="mt-1 whitespace-pre-line text-sm text-slate-700">{s.body}</p>
                </>
              )}

              {editingId !== s._id && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {status !== "approved" && (
                    <button onClick={() => approve(s._id)} className="rounded-full bg-brand-500 px-4 py-1.5 text-sm font-semibold text-white hover:bg-brand-400">
                      Approve
                    </button>
                  )}
                  {status !== "rejected" && (
                    <button onClick={() => reject(s._id)} className="rounded-full border border-amber-400/40 px-4 py-1.5 text-sm text-amber-700 hover:bg-amber-500/10">
                      Reject
                    </button>
                  )}
                  <button onClick={() => startEdit(s)} className="rounded-full border border-slate-900/10 px-4 py-1.5 text-sm text-slate-700 hover:bg-slate-900/5">
                    Edit
                  </button>
                  <button onClick={() => remove(s._id)} className="rounded-full border border-red-400/30 px-4 py-1.5 text-sm text-red-700 hover:bg-red-500/10">
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </AdminLayout>
  );
}
