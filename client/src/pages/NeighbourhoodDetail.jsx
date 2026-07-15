import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import apiClient from "../api/client.js";
import SafetyRatingBadge from "../components/SafetyRatingBadge.jsx";
import BackToHomeLink from "../components/BackToHomeLink.jsx";
import LastVerifiedBadge from "../components/LastVerifiedBadge.jsx";

export default function NeighbourhoodDetail() {
  const { slug } = useParams();
  const [neighbourhood, setNeighbourhood] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setNeighbourhood(null);
    setNotFound(false);
    apiClient
      .get(`/neighbourhoods/${slug}`)
      .then((res) => setNeighbourhood(res.data))
      .catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) {
    return (
      <div className="container-page py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Neighbourhood not found</h1>
        <div className="mt-4 flex items-center justify-center gap-4">
          <Link to="/neighbourhoods" className="text-brand-600 hover:text-brand-700">
            ← Back to neighbourhoods
          </Link>
          <BackToHomeLink />
        </div>
      </div>
    );
  }

  if (!neighbourhood) return <div className="container-page py-16 text-slate-500">Loading…</div>;

  return (
    <motion.article initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="container-page max-w-3xl py-12">
      <div className="flex items-center gap-4">
        <Link to="/neighbourhoods" className="text-sm text-brand-600 hover:text-brand-700">
          ← Back to neighbourhoods
        </Link>
        <BackToHomeLink />
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{neighbourhood.name}</h1>
          <p className="text-slate-500">{neighbourhood.city}</p>
        </div>
        <SafetyRatingBadge rating={neighbourhood.safetyRating} />
      </div>

      <p className="mt-6 text-lg leading-relaxed text-slate-700">{neighbourhood.description}</p>

      <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-900/10 bg-slate-900/[0.03] p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Cost of living</dt>
          <dd className="mt-1 text-lg font-semibold capitalize text-slate-900">{neighbourhood.costOfLiving}</dd>
        </div>
        <div className="rounded-xl border border-slate-900/10 bg-slate-900/[0.03] p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Transit access</dt>
          <dd className="mt-1 text-sm text-slate-900">{neighbourhood.transitAccess}</dd>
        </div>
        <div className="rounded-xl border border-slate-900/10 bg-slate-900/[0.03] p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Student population</dt>
          <dd className="mt-1 text-sm text-slate-900">{neighbourhood.studentPopulation}</dd>
        </div>
      </dl>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-600">Pros</h2>
          <ul className="mt-2 list-inside list-disc space-y-1 text-slate-700">
            {neighbourhood.pros.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-amber-700">Cons</h2>
          <ul className="mt-2 list-inside list-disc space-y-1 text-slate-700">
            {neighbourhood.cons.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>

      {neighbourhood.sources?.length > 0 && (
        <div className="mt-10 border-t border-slate-900/10 pt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Sources</h2>
          <ul className="mt-2 space-y-1">
            {neighbourhood.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noreferrer" className="text-sm text-brand-600 hover:text-brand-700">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-10 border-t border-slate-900/10 pt-6">
        <LastVerifiedBadge contentType="Neighbourhood" contentId={neighbourhood._id} lastVerified={neighbourhood.lastVerified} />
      </div>
    </motion.article>
  );
}
