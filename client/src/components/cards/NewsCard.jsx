import MotionCard from "./MotionCard.jsx";

const CATEGORY_LABELS = {
  "visa-immigration": "Visa & Immigration",
  accommodation: "Housing & Accommodation",
  employment: "Employment & Regulation",
  "racism-discrimination": "Racism & Discrimination",
  general: "General Student Life",
};

export default function NewsCard({ article }) {
  return (
    <MotionCard as="a" href={article.url} target="_blank" rel="noreferrer" className="block">
      <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
        <span className="rounded-full bg-white/5 px-2.5 py-1 font-medium text-brand-300">
          {CATEGORY_LABELS[article.category] || article.category}
        </span>
        {article.publishedAt && <time dateTime={article.publishedAt}>{new Date(article.publishedAt).toLocaleDateString()}</time>}
      </div>
      <h3 className="mt-2 text-lg font-semibold text-white">{article.title}</h3>
      {article.description && <p className="mt-2 text-sm leading-relaxed text-slate-300">{article.description}</p>}
      <p className="mt-3 text-xs text-slate-500">{article.sourceName || "Source"}</p>
    </MotionCard>
  );
}
