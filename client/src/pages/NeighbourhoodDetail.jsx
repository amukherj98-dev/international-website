import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import apiClient from "../api/client.js";
import SafetyRatingBadge from "../components/SafetyRatingBadge.jsx";
import BackToHomeLink from "../components/BackToHomeLink.jsx";

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
        <h1 className="text-2xl font-bold text-white">Neighbourhood not found</h1>
        <div className="mt-4 flex items-center justify-center gap-4">
          <Link to="/neighbourhoods" className="text-brand-300 hover:text-brand-200">
            ← Back to neighbourhoods
          </Link>
          <BackToHomeLink />
        </div>
      </div>
    );
  }

  if (!neighbourhood) return <div className="container-page py-16 text-slate-400">Loading…</div>;

  return (
    <motion.article initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="container-page max-w-3xl py-12">
      <div className="flex items-center gap-4">
        <Link to="/neighbourhoods" className="text-sm text-brand-300 hover:text-brand-200">
          ← Back to neighbourhoods
        </Link>
        <BackToHomeLink />
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">{neighbourhood.name}</h1>
          <p className="text-slate-400">{neighbourhood.city}</p>
        </div>
        <SafetyRatingBadge rating={neighbourhood.safetyRating} />
      </div>

      <p className="mt-6 text-lg leading-relaxed text-slate-300">{neighbourhood.description}</p>

      <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Cost of living</dt>
          <dd className="mt-1 text-lg font-semibold capitalize text-white">{neighbourhood.costOfLiving}</dd>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Transit access</dt>
          <dd className="mt-1 text-sm text-white">{neighbourhood.transitAccess}</dd>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Student population</dt>
          <dd className="mt-1 text-sm text-white">{neighbourhood.studentPopulation}</dd>
        </div>
      </dl>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-300">Pros</h2>
          <ul className="mt-2 list-inside list-disc space-y-1 text-slate-300">
            {neighbourhood.pros.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-amber-300">Cons</h2>
          <ul className="mt-2 list-inside list-disc space-y-1 text-slate-300">
            {neighbourhood.cons.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>

      {neighbourhood.sources?.length > 0 && (
        <div className="mt-10 border-t border-white/10 pt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Sources</h2>
          <ul className="mt-2 space-y-1">
            {neighbourhood.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noreferrer" className="text-sm text-brand-300 hover:text-brand-200">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.article>
  );
}
