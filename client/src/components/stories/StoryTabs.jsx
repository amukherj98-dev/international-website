import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import apiClient from "../../api/client.js";
import StoryCard from "../cards/StoryCard.jsx";
import { staggerContainer, fadeInUp } from "../../utils/motionConfig.js";

const TABS = [
  { mode: "reflection", label: "Feedback" },
  { mode: "must-do", label: "Must-Dos" },
  { mode: "testimonial", label: "Testimonials" },
];

export default function StoryTabs({ theme }) {
  const [activeMode, setActiveMode] = useState("reflection");
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("/stories", { params: { displayMode: activeMode, theme: theme || undefined } })
      .then((res) => setStories(res.data))
      .finally(() => setLoading(false));
  }, [activeMode, theme]);

  return (
    <div>
      <div role="tablist" aria-label="Story display mode" className="flex flex-wrap gap-2 border-b border-white/10">
        {TABS.map((tab) => (
          <button
            key={tab.mode}
            type="button"
            role="tab"
            aria-selected={activeMode === tab.mode}
            onClick={() => setActiveMode(tab.mode)}
            className={`rounded-t-lg px-4 py-2 text-sm font-semibold transition ${
              activeMode === tab.mode
                ? "border-b-2 border-brand-400 text-brand-300"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="mt-8 text-slate-400">Loading…</p>
      ) : stories.length === 0 ? (
        <p className="mt-8 text-slate-400">No stories here yet.</p>
      ) : (
        <motion.div
          key={activeMode}
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {stories.map((s) => (
            <motion.div key={s._id} {...fadeInUp}>
              <StoryCard story={s} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
