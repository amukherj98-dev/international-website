const LEVELS = {
  5: { label: "Very safe", classes: "bg-brand-500/20 text-brand-600 border-brand-400/40" },
  4: { label: "Safe", classes: "bg-brand-500/15 text-brand-700 border-brand-400/30" },
  3: { label: "Generally safe", classes: "bg-amber-500/15 text-amber-700 border-amber-400/30" },
  2: { label: "Use caution", classes: "bg-orange-500/15 text-orange-700 border-orange-400/30" },
  1: { label: "Higher caution", classes: "bg-red-500/15 text-red-700 border-red-400/30" },
};

export default function SafetyRatingBadge({ rating }) {
  const level = LEVELS[Math.round(rating)] || LEVELS[3];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${level.classes}`}
      title={`Safety rating: ${rating} out of 5 - ${level.label}`}
    >
      <span aria-hidden="true">{"★".repeat(Math.round(rating))}{"☆".repeat(5 - Math.round(rating))}</span>
      <span>{level.label}</span>
    </span>
  );
}
