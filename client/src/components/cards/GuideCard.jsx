import { Link } from "react-router-dom";
import MotionCard from "./MotionCard.jsx";

export default function GuideCard({ guide }) {
  return (
    <MotionCard as={Link} to={`/guides/${guide.category}/${guide.slug}`} className="block focus-visible:border-brand-400">
      <h3 className="text-lg font-semibold text-white">{guide.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">{guide.summary}</p>
      {guide.sources?.length > 0 && (
        <p className="mt-3 text-xs text-slate-500">Source: {guide.sources[0].label}</p>
      )}
    </MotionCard>
  );
}
