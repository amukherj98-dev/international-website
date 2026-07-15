import MotionCard from "./MotionCard.jsx";
import LastVerifiedBadge from "../LastVerifiedBadge.jsx";

const MODE_COPY = {
  reflection: null,
  "must-do": "Why it matters",
  testimonial: null,
};

export default function StoryCard({ story }) {
  const whyLabel = MODE_COPY[story.displayMode];

  return (
    <MotionCard>
      <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
        <span className="font-semibold text-brand-600">{story.author}</span>
        {(story.origin || story.programme) && (
          <span>{[story.origin, story.programme].filter(Boolean).join(" · ")}</span>
        )}
      </div>

      {story.displayMode === "reflection" ? (
        <blockquote className="mt-3 whitespace-pre-line text-lg italic leading-relaxed text-slate-900">
          “{story.featuredQuote}”
        </blockquote>
      ) : (
        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-800">{story.body}</p>
      )}

      {whyLabel && story.displayMode !== "reflection" && (
        <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-400">{whyLabel}: {story.featuredQuote}</p>
      )}

      <div className="mt-4 border-t border-slate-900/10 pt-3">
        <LastVerifiedBadge contentType="Story" contentId={story._id} lastVerified={story.lastVerified} />
      </div>
    </MotionCard>
  );
}
