import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import apiClient from "../api/client.js";
import Modal from "./Modal.jsx";

export default function LastVerifiedBadge({ contentType, contentId, lastVerified }) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: "submitting", message: "" });
    try {
      await apiClient.post("/corrections", {
        contentType,
        contentId,
        note,
        submitterEmail: email || undefined,
      });
      setStatus({ state: "success", message: "Thanks - we'll take a look." });
      setNote("");
      setEmail("");
    } catch (err) {
      const message = err.response?.data?.errors?.[0]?.msg || err.response?.data?.message || "Something went wrong. Please try again.";
      setStatus({ state: "error", message });
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
      {lastVerified && (
        <span>
          Last verified{" "}
          <time dateTime={lastVerified}>
            {new Date(lastVerified).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
          </time>
        </span>
      )}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="font-semibold text-brand-600 underline decoration-dotted underline-offset-2 hover:text-brand-700"
      >
        Report outdated information
      </button>

      <AnimatePresence>
        {open && (
          <Modal titleId="report-outdated-title" title="Report outdated information" onClose={() => setOpen(false)}>
            {status.state === "success" ? (
              <p className="text-sm text-brand-600">{status.message}</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                <div>
                  <label htmlFor="correction-note" className="text-sm font-medium text-slate-700">
                    What's outdated or wrong?
                  </label>
                  <textarea
                    id="correction-note"
                    required
                    minLength={3}
                    maxLength={500}
                    rows={4}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-900/10 bg-slate-900/5 px-3 py-2 text-sm text-slate-900"
                  />
                </div>
                <div>
                  <label htmlFor="correction-email" className="text-sm font-medium text-slate-700">
                    Email <span className="text-slate-400">(optional)</span>
                  </label>
                  <input
                    id="correction-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-900/10 bg-slate-900/5 px-3 py-2 text-sm text-slate-900"
                  />
                </div>
                {status.state === "error" && <p className="text-sm text-red-600">{status.message}</p>}
                <button
                  type="submit"
                  disabled={status.state === "submitting"}
                  className="w-full rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-400 disabled:opacity-60"
                >
                  {status.state === "submitting" ? "Sending…" : "Send report"}
                </button>
              </form>
            )}
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
