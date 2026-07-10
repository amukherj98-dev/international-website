import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import apiClient from "../api/client.js";
import useCategories from "../utils/useCategories.js";
import SubmissionCard from "../components/cards/SubmissionCard.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";
import BackToHomeLink from "../components/BackToHomeLink.jsx";
import { staggerContainer, fadeInUp } from "../utils/motionConfig.js";

const initialForm = { name: "", email: "", category: "", title: "", body: "" };

export default function Community() {
  const [submissions, setSubmissions] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const { submissionCategories } = useCategories();

  const loadSubmissions = () => {
    setLoading(true);
    apiClient
      .get("/submissions", { params: { category: category || undefined } })
      .then((res) => setSubmissions(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(loadSubmissions, [category]);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: "submitting", message: "" });
    try {
      await apiClient.post("/submissions", form);
      setForm(initialForm);
      setStatus({ state: "success", message: "Thanks! Your story has been submitted and is awaiting admin review before it appears publicly." });
    } catch (err) {
      const message = err.response?.data?.errors?.[0]?.msg || err.response?.data?.message || "Something went wrong. Please try again.";
      setStatus({ state: "error", message });
    }
  };

  return (
    <div className="container-page py-12">
      <BackToHomeLink />
      <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Community experiences</h1>
      <p className="mt-2 max-w-2xl text-slate-400">
        Real insights from international students in Ireland. Every story is reviewed by an admin before it's published.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          <CategoryFilter categories={submissionCategories} value={category} onChange={setCategory} />
          {loading ? (
            <p className="mt-8 text-slate-400">Loading…</p>
          ) : submissions.length === 0 ? (
            <p className="mt-8 text-slate-400">No approved stories in this category yet - be the first to share one!</p>
          ) : (
            <motion.div variants={staggerContainer} initial="initial" animate="animate" className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {submissions.map((s) => (
                <motion.div key={s._id} {...fadeInUp}>
                  <SubmissionCard submission={s} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        <aside className="h-fit rounded-2xl border border-white/10 bg-white/[0.03] p-6" aria-labelledby="submit-form-heading">
          <h2 id="submit-form-heading" className="text-lg font-semibold text-white">
            Share your experience
          </h2>
          <p className="mt-1 text-sm text-slate-400">No account needed. Name and email are optional.</p>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4" noValidate>
            <div>
              <label htmlFor="name" className="text-sm font-medium text-slate-300">
                Name <span className="text-slate-500">(optional, defaults to Anonymous)</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-slate-300">
                Email <span className="text-slate-500">(optional, kept private)</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label htmlFor="category" className="text-sm font-medium text-slate-300">
                Category
              </label>
              <select
                id="category"
                name="category"
                required
                value={form.category}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
              >
                <option value="" disabled>
                  Choose a category
                </option>
                {submissionCategories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="title" className="text-sm font-medium text-slate-300">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                minLength={3}
                maxLength={150}
                value={form.title}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label htmlFor="body" className="text-sm font-medium text-slate-300">
                Your story
              </label>
              <textarea
                id="body"
                name="body"
                required
                minLength={20}
                maxLength={5000}
                rows={6}
                value={form.body}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
              />
            </div>

            <div aria-live="polite">
              {status.state === "error" && <p className="text-sm text-red-400">{status.message}</p>}
              {status.state === "success" && <p className="text-sm text-brand-300">{status.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status.state === "submitting"}
              className="w-full rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-400 disabled:opacity-60"
            >
              {status.state === "submitting" ? "Submitting…" : "Submit for review"}
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
}
