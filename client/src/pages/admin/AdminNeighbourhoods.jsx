import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import apiClient from "../../api/client.js";
import AdminLayout from "../../components/admin/AdminLayout.jsx";

const emptyForm = {
  name: "",
  city: "",
  description: "",
  safetyRating: 4,
  costOfLiving: "medium",
  transitAccess: "",
  studentPopulation: "",
  pros: "",
  cons: "",
};

export default function AdminNeighbourhoods() {
  const [neighbourhoods, setNeighbourhoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [searchParams] = useSearchParams();

  const load = () => {
    setLoading(true);
    apiClient
      .get("/neighbourhoods")
      .then((res) => {
        setNeighbourhoods(res.data);
        const editId = searchParams.get("edit");
        if (editId) {
          const match = res.data.find((n) => n._id === editId);
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

  const startEdit = (n) => {
    setEditingId(n._id);
    setForm({
      name: n.name,
      city: n.city,
      description: n.description,
      safetyRating: n.safetyRating,
      costOfLiving: n.costOfLiving,
      transitAccess: n.transitAccess,
      studentPopulation: n.studentPopulation,
      pros: n.pros.join(", "),
      cons: n.cons.join(", "),
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      safetyRating: Number(form.safetyRating),
      pros: form.pros.split(",").map((p) => p.trim()).filter(Boolean),
      cons: form.cons.split(",").map((c) => c.trim()).filter(Boolean),
    };
    if (editingId) await apiClient.put(`/neighbourhoods/${editingId}`, payload);
    else await apiClient.post("/neighbourhoods", payload);
    resetForm();
    load();
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this neighbourhood?")) return;
    await apiClient.delete(`/neighbourhoods/${id}`);
    load();
  };

  return (
    <AdminLayout title="Neighbourhoods">
      <button
        onClick={() => {
          resetForm();
          setShowForm(true);
        }}
        className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-400"
      >
        + New neighbourhood
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-3 rounded-xl border border-slate-900/10 bg-slate-900/[0.03] p-5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} required />
            <Field label="City" value={form.city} onChange={(v) => setForm((f) => ({ ...f, city: v }))} required />
          </div>
          <div>
            <label className="text-sm text-slate-700">Description</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-slate-900/10 bg-slate-900/5 px-3 py-2 text-sm text-slate-900"
            />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label className="text-sm text-slate-700">Safety rating (1-5)</label>
              <input
                type="number"
                min={1}
                max={5}
                required
                value={form.safetyRating}
                onChange={(e) => setForm((f) => ({ ...f, safetyRating: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-900/10 bg-slate-900/5 px-3 py-2 text-sm text-slate-900"
              />
            </div>
            <div>
              <label className="text-sm text-slate-700">Cost of living</label>
              <select
                value={form.costOfLiving}
                onChange={(e) => setForm((f) => ({ ...f, costOfLiving: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-900/10 bg-slate-900/5 px-3 py-2 text-sm text-slate-900"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <Field label="Student population" value={form.studentPopulation} onChange={(v) => setForm((f) => ({ ...f, studentPopulation: v }))} />
          </div>
          <Field label="Transit access" value={form.transitAccess} onChange={(v) => setForm((f) => ({ ...f, transitAccess: v }))} />
          <Field label="Pros (comma separated)" value={form.pros} onChange={(v) => setForm((f) => ({ ...f, pros: v }))} />
          <Field label="Cons (comma separated)" value={form.cons} onChange={(v) => setForm((f) => ({ ...f, cons: v }))} />

          <div className="flex gap-2">
            <button type="submit" className="rounded-full bg-brand-500 px-4 py-1.5 text-sm font-semibold text-white">
              {editingId ? "Save changes" : "Create"}
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
                <th scope="col" className="py-2 pr-4">Name</th>
                <th scope="col" className="py-2 pr-4">City</th>
                <th scope="col" className="py-2 pr-4">Safety</th>
                <th scope="col" className="py-2 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {neighbourhoods.map((n) => (
                <tr key={n._id} className="border-b border-slate-900/5">
                  <td className="py-2 pr-4 text-slate-900">{n.name}</td>
                  <td className="py-2 pr-4 text-slate-500">{n.city}</td>
                  <td className="py-2 pr-4 text-slate-500">{n.safetyRating}/5</td>
                  <td className="py-2 pr-4">
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(n)} className="text-brand-600 hover:text-brand-700">
                        Edit
                      </button>
                      <button onClick={() => remove(n._id)} className="text-red-700 hover:text-red-800">
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

function Field({ label, value, onChange, required }) {
  return (
    <div>
      <label className="text-sm text-slate-700">{label}</label>
      <input
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-slate-900/10 bg-slate-900/5 px-3 py-2 text-sm text-slate-900"
      />
    </div>
  );
}
