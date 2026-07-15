import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import apiClient from "../../api/client.js";
import Modal from "../Modal.jsx";
import StoryCard from "../cards/StoryCard.jsx";
import { staggerContainer, fadeInUp } from "../../utils/motionConfig.js";

const MAX_LENGTH = 300;
const initialForm = { name: "", message: "" };

// Alternate bubble alignment/tint for a lightweight chat-bubble feel.
const BUBBLE_STYLES = [
  "bg-brand-500/10 border-brand-400/30 sm:mr-auto",
  "bg-white/80 backdrop-blur-sm border-slate-900/10 sm:ml-auto",
];

const TABS = [
  { key: "feedback", label: "Feedback" },
  { key: "personal", label: "Personal experiences" },
];

export default function FeedbackBubbles() {
  const [activeTab, setActiveTab] = useState("feedback");
  const [feedback, setFeedback] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ state: "idle", message: "" });

  useEffect(() => {
    apiClient.get("/feedback").then((res) => setFeedback(res.data));
    apiClient.get("/stories", { params: { displayMode: "testimonial" } }).then((res) => setTestimonials(res.data));
  }, []);

  const remaining = MAX_LENGTH - form.message.length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: "submitting", message: "" });
    try {
      await apiClient.post("/feedback", form);
      setForm(initialForm);
      setStatus({ state: "success", message: "Thanks! Your feedback is awaiting admin approval before it appears here." });
    } catch (err) {
      const message = err.response?.data?.errors?.[0]?.msg || err.response?.data?.message || "Something went wrong. Please try again.";
      setStatus({ state: "error", message });
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setStatus({ state: "idle", message: "" });
  };

  return (
    <section aria-labelledby="feedback-heading" className="border-t border-slate-900/10 bg-white py-16">
      <div className="container-page">
        <h2 id="feedback-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
          What students are saying
        </h2>
        <p className="mt-2 max-w-2xl text-slate-500">Quick reactions and personal favourites from people who've used this site.</p>

        <div role="tablist" aria-label="What students are saying" className="mt-6 flex gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                activeTab === tab.key ? "bg-brand-500 text-white" : "bg-slate-900/5 text-slate-700 hover:bg-slate-900/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "feedback" ? (
          <>
            {feedback.length === 0 ? (
              <p className="mt-8 text-slate-500">No feedback yet - be the first to share yours.</p>
            ) : (
              <motion.ul
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-60px" }}
                className="mt-8 flex flex-col gap-3 sm:gap-4"
              >
                {feedback.map((f, i) => (
                  <motion.li
                    key={f._id}
                    {...fadeInUp}
                    className={`max-w-lg rounded-2xl border px-5 py-3 sm:w-fit ${BUBBLE_STYLES[i % BUBBLE_STYLES.length]}`}
                  >
                    <p className="text-sm leading-relaxed text-slate-900">{f.message}</p>
                    <p className="mt-1.5 text-xs font-medium text-slate-500">- {f.name || "Anonymous"}</p>
                  </motion.li>
                ))}
              </motion.ul>
            )}

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="mt-8 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-400"
            >
              Add your feedback
            </button>
          </>
        ) : (
          <>
            {testimonials.length === 0 ? (
              <p className="mt-8 text-slate-500">No personal experiences shared yet - be the first.</p>
            ) : (
              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-60px" }}
                className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
              >
                {testimonials.map((s) => (
                  <motion.div key={s._id} {...fadeInUp}>
                    <StoryCard story={s} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            <Link
              to="/community"
              className="mt-8 inline-block rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-400"
            >
              Share your experience
            </Link>
          </>
        )}
      </div>

      {modalOpen && (
        <Modal titleId="feedback-modal-title" title="Add your feedback" onClose={closeModal}>
          {status.state === "success" ? (
            <div>
              <p className="text-sm text-brand-600">{status.message}</p>
              <button
                type="button"
                onClick={closeModal}
                className="mt-4 rounded-full border border-slate-900/10 px-4 py-1.5 text-sm text-slate-700 hover:bg-slate-900/5"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="feedback-name" className="text-sm font-medium text-slate-700">
                  Name <span className="text-slate-400">(optional)</span>
                </label>
                <input
                  id="feedback-name"
                  type="text"
                  maxLength={80}
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-slate-900/10 bg-slate-900/5 px-3 py-2 text-sm text-slate-900"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="feedback-message" className="text-sm font-medium text-slate-700">
                    Your feedback
                  </label>
                  <span
                    className={`text-xs ${remaining < 0 ? "text-red-600" : "text-slate-400"}`}
                    aria-live="polite"
                  >
                    {remaining} characters left
                  </span>
                </div>
                <textarea
                  id="feedback-message"
                  required
                  rows={4}
                  maxLength={MAX_LENGTH}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-slate-900/10 bg-slate-900/5 px-3 py-2 text-sm text-slate-900"
                />
              </div>

              <div aria-live="polite">
                {status.state === "error" && <p className="text-sm text-red-600">{status.message}</p>}
              </div>

              <button
                type="submit"
                disabled={status.state === "submitting" || form.message.trim().length === 0}
                className="w-full rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-400 disabled:opacity-60"
              >
                {status.state === "submitting" ? "Submitting…" : "Submit for review"}
              </button>
            </form>
          )}
        </Modal>
      )}
    </section>
  );
}
