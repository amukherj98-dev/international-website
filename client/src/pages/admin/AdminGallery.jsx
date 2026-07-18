import { useEffect, useState } from "react";
import apiClient from "../../api/client.js";
import AdminLayout from "../../components/admin/AdminLayout.jsx";

const emptyForm = { alt: "", caption: "", side: "left", order: 0, isFeatured: false, isActive: true, file: null };

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    apiClient
      .get("/gallery-images/admin")
      .then((res) => setImages(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    setError("");
  };

  const startEdit = (img) => {
    setEditingId(img._id);
    setForm({
      alt: img.alt,
      caption: img.caption || "",
      side: img.side,
      order: img.order,
      isFeatured: img.isFeatured,
      isActive: img.isActive,
      file: null,
    });
    setShowForm(true);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.alt.trim()) {
      setError("Alt text is required.");
      return;
    }
    if (!editingId && !form.file) {
      setError("An image file is required.");
      return;
    }

    const fd = new FormData();
    fd.append("alt", form.alt.trim());
    fd.append("caption", form.caption.trim());
    fd.append("side", form.side);
    fd.append("order", String(form.order));
    fd.append("isFeatured", String(form.isFeatured));
    fd.append("isActive", String(form.isActive));
    if (form.file) fd.append("image", form.file);

    setSaving(true);
    setError("");
    try {
      if (editingId) {
        await apiClient.put(`/gallery-images/${editingId}`, fd);
      } else {
        await apiClient.post("/gallery-images", fd);
      }
      resetForm();
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this gallery image?")) return;
    await apiClient.delete(`/gallery-images/${id}`);
    load();
  };

  return (
    <AdminLayout title="Gallery">
      <p className="text-sm text-slate-500">
        Photos for the homepage staircase. The featured image always leads the sequence; the rest shuffle on every page load.
      </p>

      <button
        onClick={() => {
          resetForm();
          setShowForm(true);
        }}
        className="mt-4 rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-400"
      >
        + New photo
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-3 rounded-xl border border-slate-900/10 bg-white/80 backdrop-blur-sm p-5">
          <div>
            <label className="text-sm text-slate-700">
              Image file {editingId && <span className="text-slate-400">(leave blank to keep current image)</span>}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setForm((f) => ({ ...f, file: e.target.files[0] || null }))}
              className="mt-1 w-full text-sm text-slate-700"
            />
          </div>

          <div>
            <label className="text-sm text-slate-700">Alt text (required)</label>
            <input
              required
              value={form.alt}
              onChange={(e) => setForm((f) => ({ ...f, alt: e.target.value }))}
              placeholder="Describe the scene meaningfully, not just 'Ireland photo'"
              className="mt-1 w-full rounded-lg border border-slate-900/10 bg-slate-900/5 px-3 py-2 text-sm text-slate-900"
            />
          </div>

          <div>
            <label className="text-sm text-slate-700">Caption (optional)</label>
            <input
              value={form.caption}
              onChange={(e) => setForm((f) => ({ ...f, caption: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-slate-900/10 bg-slate-900/5 px-3 py-2 text-sm text-slate-900"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label className="text-sm text-slate-700">Side</label>
              <select
                value={form.side}
                onChange={(e) => setForm((f) => ({ ...f, side: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-900/10 bg-slate-900/5 px-3 py-2 text-sm text-slate-900"
              >
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-700">Order</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm((f) => ({ ...f, order: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-900/10 bg-slate-900/5 px-3 py-2 text-sm text-slate-900"
              />
            </div>
            <div className="flex flex-col justify-end gap-2 pb-1">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) => setForm((f) => ({ ...f, isFeatured: e.target.checked }))}
                />
                Featured (always first)
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
                />
                Active (visible on site)
              </label>
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex gap-2">
            <button type="submit" disabled={saving} className="rounded-full bg-brand-500 px-4 py-1.5 text-sm font-semibold text-white disabled:opacity-60">
              {saving ? "Saving…" : editingId ? "Save changes" : "Upload photo"}
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
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img) => (
            <div key={img._id} className="overflow-hidden rounded-xl border border-slate-900/10 bg-white/80 backdrop-blur-sm">
              <img src={img.fallbackUrl} alt={img.alt} className="h-36 w-full object-cover" />
              <div className="p-3">
                <p className="text-sm text-slate-900 line-clamp-2">{img.alt}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {img.side} · order {img.order} {img.isFeatured && "· featured"} {!img.isActive && "· inactive"}
                </p>
                <div className="mt-2 flex gap-2">
                  <button onClick={() => startEdit(img)} className="text-sm text-brand-600 hover:text-brand-700">
                    Edit
                  </button>
                  <button onClick={() => remove(img._id)} className="text-sm text-red-600 hover:text-red-700">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
