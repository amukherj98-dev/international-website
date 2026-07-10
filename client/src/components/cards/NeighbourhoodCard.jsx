import { Link } from "react-router-dom";
import MotionCard from "./MotionCard.jsx";
import SafetyRatingBadge from "../SafetyRatingBadge.jsx";

export default function NeighbourhoodCard({ neighbourhood }) {
  return (
    <MotionCard as={Link} to={`/neighbourhoods/${neighbourhood.slug}`} className="block">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">{neighbourhood.name}</h3>
          <p className="text-sm text-slate-400">{neighbourhood.city}</p>
        </div>
        <SafetyRatingBadge rating={neighbourhood.safetyRating} />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-300">{neighbourhood.description}</p>
      <dl className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-400">
        <div>
          <dt className="font-semibold text-slate-300">Cost of living</dt>
          <dd className="capitalize">{neighbourhood.costOfLiving}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-300">Students</dt>
          <dd>{neighbourhood.studentPopulation}</dd>
        </div>
      </dl>
    </MotionCard>
  );
}
