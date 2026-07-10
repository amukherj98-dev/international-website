import { useEffect, useState } from "react";
import apiClient from "../../api/client.js";
import useCategories from "../../utils/useCategories.js";
import AdminLayout from "../../components/admin/AdminLayout.jsx";

const emptyForm = { category: "", title: "", summary: "", sourceLabel: "", sourceUrl: "" };

export default function AdminGuides() {
  const [guides, setGuides] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const { guideCategories } = useCategories();

  const load = () => {
    setLoading(true);
    apiClient
      .get("/guides", { params: { category: category || undefined } })
      .then((res) => setGuides(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(load, [category]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const startEdit = (guide) => {
    setEditingId(guide._id);
    setForm({
      category: guide.category,
      title: guide.title,
      summary: guide.summary,
      sourceLabel: guide.sources?.[0]?.label || "",
      sourceUrl: guide.sources?.[0]?.url || "",
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      category: form.category,
      title: form.title,
      summary: form.summary,
      sources: form.sourceUrl ? [{ label: form.sourceLabel || form.sourceUrl, url: form.sourceUrl }] : [],
    };
    if (editingId) {
      await apiClient.put(`/guides/${editingId}`, payload);
    } else {
      await apiClient.post("/guides", payload);
    }
    resetForm();
    load();
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this guide topic?")) return;
    await apiClient.delete(`/guides/${id}`);
    load();
  };

  return (
    <AdminLayout title="Guides">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
        >
          <option value="">All categories</option>
          {guideCategories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.label}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-400"
        >
          + New topic
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-3 rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="text-sm text-slate-300">Category</label>
              <select
                required
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
              >
                <option value="" disabled>
                  Choose category
                </option>
                {guideCategories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-300">Title</label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-slate-300">Summary</label>
            <textarea
              required
              rows={3}
              value={form.summary}
              onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
            />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="text-sm text-slate-300">Source label</label>
              <input
                value={form.sourceLabel}
                onChange={(e) => setForm((f) => ({ ...f, sourceLabel: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="text-sm text-slate-300">Source URL</label>
              <input
                type="url"
                value={form.sourceUrl}
                onChange={(e) => setForm((f) => ({ ...f, sourceUrl: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="rounded-full bg-brand-500 px-4 py-1.5 text-sm font-semibold text-white">
              {editingId ? "Save changes" : "Create topic"}
            </button>
            <button type="button" onClick={resetForm} className="rounded-full border border-white/10 px-4 py-1.5 text-sm text-slate-300">
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="mt-8 text-slate-400">Loading…</p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th scope="col" className="py-2 pr-4">Category</th>
                <th scope="col" className="py-2 pr-4">Title</th>
                <th scope="col" className="py-2 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {guides.map((g) => (
                <tr key={g._id} className="border-b border-white/5">
                  <td className="py-2 pr-4 text-slate-400">{g.category}</td>
                  <td className="py-2 pr-4 text-white">{g.title}</td>
                  <td className="py-2 pr-4">
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(g)} className="text-brand-300 hover:text-brand-200">
                        Edit
                      </button>
                      <button onClick={() => remove(g._id)} className="text-red-300 hover:text-red-200">
                        Delete
                      </button>
                    </div>
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
