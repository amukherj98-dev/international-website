import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import apiClient from "../../api/client.js";
import useCategories from "../../utils/useCategories.js";
import AdminLayout from "../../components/admin/AdminLayout.jsx";

const emptyForm = {
  author: "",
  origin: "",
  programme: "",
  arrivalYear: "",
  body: "",
  featuredQuote: "",
  displayMode: "reflection",
  status: "draft",
  themes: [],
};

const DISPLAY_MODES = [
  { value: "reflection", label: "Feedback (reflection)" },
  { value: "must-do", label: "Must-Dos" },
  { value: "testimonial", label: "Testimonials" },
];

export default function AdminStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const { guideCategories } = useCategories();
  const [searchParams] = useSearchParams();

  const load = () => {
    setLoading(true);
    apiClient
      .get("/stories/admin")
      .then((res) => {
        setStories(res.data);
        const editId = searchParams.get("edit");
        if (editId) {
          const match = res.data.find((s) => s._id === editId);
          if (match) startEdit(match);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const startEdit = (story) => {
    setEditingId(story._id);
    setForm({
      author: story.author,
      origin: story.origin || "",
      programme: story.programme || "",
      arrivalYear: story.arrivalYear || "",
      body: story.body,
      featuredQuote: story.featuredQuote,
      displayMode: story.displayMode,
      status: story.status,
      themes: story.themes || [],
    });
    setShowForm(true);
  };

  const toggleTheme = (slug) => {
    setForm((f) => ({
      ...f,
      themes: f.themes.includes(slug) ? f.themes.filter((t) => t !== slug) : [...f.themes, slug],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      arrivalYear: form.arrivalYear ? Number(form.arrivalYear) : undefined,
    };
    if (editingId) {
      await apiClient.put(`/stories/${editingId}`, payload);
    } else {
      await apiClient.post("/stories", payload);
    }
    resetForm();
    load();
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this story?")) return;
    await apiClient.delete(`/stories/${id}`);
    load();
  };

  return (
    <AdminLayout title="Stories">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500">{stories.length} stor{stories.length === 1 ? "y" : "ies"}</p>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-400"
        >
          + New story
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-3 rounded-xl border border-slate-900/10 bg-white/80 backdrop-blur-sm p-5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label className="text-sm text-slate-700">Author</label>
              <input
                required
                value={form.author}
                onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-900/10 bg-slate-900/5 px-3 py-2 text-sm text-slate-900"
              />
            </div>
            <div>
              <label className="text-sm text-slate-700">Origin</label>
              <input
                value={form.origin}
                onChange={(e) => setForm((f) => ({ ...f, origin: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-900/10 bg-slate-900/5 px-3 py-2 text-sm text-slate-900"
              />
            </div>
            <div>
              <label className="text-sm text-slate-700">Programme</label>
              <input
                value={form.programme}
                onChange={(e) => setForm((f) => ({ ...f, programme: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-900/10 bg-slate-900/5 px-3 py-2 text-sm text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label className="text-sm text-slate-700">Arrival year</label>
              <input
                type="number"
                value={form.arrivalYear}
                onChange={(e) => setForm((f) => ({ ...f, arrivalYear: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-900/10 bg-slate-900/5 px-3 py-2 text-sm text-slate-900"
              />
            </div>
            <div>
              <label className="text-sm text-slate-700">Display mode</label>
              <select
                value={form.displayMode}
                onChange={(e) => setForm((f) => ({ ...f, displayMode: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-900/10 bg-slate-900/5 px-3 py-2 text-sm text-slate-900"
              >
                {DISPLAY_MODES.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-700">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-900/10 bg-slate-900/5 px-3 py-2 text-sm text-slate-900"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-700">Featured quote</label>
            <input
              required
              value={form.featuredQuote}
              onChange={(e) => setForm((f) => ({ ...f, featuredQuote: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-slate-900/10 bg-slate-900/5 px-3 py-2 text-sm text-slate-900"
            />
          </div>

          <div>
            <label className="text-sm text-slate-700">Body</label>
            <textarea
              required
              rows={4}
              value={form.body}
              onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-slate-900/10 bg-slate-900/5 px-3 py-2 text-sm text-slate-900"
            />
          </div>

          <div>
            <label className="text-sm text-slate-700">Themes (guide categories)</label>
            <div className="mt-1 flex flex-wrap gap-2">
              {guideCategories.map((c) => (
                <button
                  type="button"
                  key={c.slug}
                  onClick={() => toggleTheme(c.slug)}
                  className={`rounded-full border px-3 py-1 text-xs ${
                    form.themes.includes(c.slug)
                      ? "border-brand-400 bg-brand-500/20 text-brand-700"
                      : "border-slate-900/10 text-slate-500 hover:bg-slate-900/5"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button type="submit" className="rounded-full bg-brand-500 px-4 py-1.5 text-sm font-semibold text-white">
              {editingId ? "Save changes" : "Create story"}
            </button>
            <button type="button" onClick={resetForm} className="rounded-full border border-slate-900/10 px-4 py-1.5 text-sm text-slate-700">
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="mt-8 text-slate-500">Loading…</p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-900/10 text-slate-500">
                <th scope="col" className="py-2 pr-4">Author</th>
                <th scope="col" className="py-2 pr-4">Mode</th>
                <th scope="col" className="py-2 pr-4">Status</th>
                <th scope="col" className="py-2 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stories.map((s) => (
                <tr key={s._id} className="border-b border-slate-900/5">
                  <td className="py-2 pr-4 text-slate-900">{s.author}</td>
                  <td className="py-2 pr-4 text-slate-500">{s.displayMode}</td>
                  <td className="py-2 pr-4 text-slate-500">{s.status}</td>
                  <td className="py-2 pr-4">
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(s)} className="text-brand-600 hover:text-brand-700">
                        Edit
                      </button>
                      <button onClick={() => remove(s._id)} className="text-red-700 hover:text-red-800">
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
