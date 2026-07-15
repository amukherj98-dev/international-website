import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import apiClient from "../api/client.js";
import BackToHomeLink from "../components/BackToHomeLink.jsx";
import LastVerifiedBadge from "../components/LastVerifiedBadge.jsx";

export default function GuideDetail() {
  const { categorySlug, slug } = useParams();
  const [guide, setGuide] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [relatedStories, setRelatedStories] = useState([]);

  useEffect(() => {
    setNotFound(false);
    setGuide(null);
    apiClient
      .get(`/guides/${slug}`)
      .then((res) => setGuide(res.data))
      .catch(() => setNotFound(true));
  }, [slug]);

  useEffect(() => {
    if (!categorySlug) return;
    apiClient
      .get("/stories", { params: { theme: categorySlug } })
      .then((res) => setRelatedStories(res.data))
      .catch(() => setRelatedStories([]));
  }, [categorySlug]);

  if (notFound) {
    return (
      <div className="container-page py-16 text-center">
        <h1 className="text-2xl font-bold text-white">Guide not found</h1>
        <div className="mt-4 flex items-center justify-center gap-4">
          <Link to={`/guides/${categorySlug}`} className="text-brand-300 hover:text-brand-200">
            ← Back to category
          </Link>
          <BackToHomeLink />
        </div>
      </div>
    );
  }

  if (!guide) return <div className="container-page py-16 text-slate-400">Loading…</div>;

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="container-page max-w-3xl py-12"
    >
      <div className="flex items-center gap-4">
        <Link to={`/guides/${categorySlug}`} className="text-sm text-brand-300 hover:text-brand-200">
          ← Back to category
        </Link>
        <BackToHomeLink />
      </div>
      <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">{guide.title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-slate-300">{guide.summary}</p>

      {guide.sections?.length > 0 && (
        <div className="mt-8 space-y-6">
          {guide.sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-xl font-semibold text-white">{section.heading}</h2>
              <p className="mt-2 whitespace-pre-line leading-relaxed text-slate-300">{section.body}</p>
            </section>
          ))}
        </div>
      )}

      {guide.sources?.length > 0 && (
        <div className="mt-10 border-t border-white/10 pt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Sources</h2>
          <ul className="mt-2 space-y-1">
            {guide.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noreferrer" className="text-sm text-brand-300 hover:text-brand-200">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {relatedStories.length > 0 && (
        <div className="mt-10 border-t border-white/10 pt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">From students who've been there</h2>
          <ul className="mt-4 space-y-4">
            {relatedStories.map((s) => (
              <li key={s._id}>
                <blockquote className="border-l-2 border-brand-400/40 pl-4 italic text-slate-200">
                  “{s.featuredQuote}”
                </blockquote>
                <p className="mt-1 pl-4 text-xs text-slate-500">— {s.author}</p>
              </li>
            ))}
          </ul>
          <Link to="/stories" className="mt-3 inline-block text-sm text-brand-300 hover:text-brand-200">
            Read more stories →
          </Link>
        </div>
      )}

      <div className="mt-10 border-t border-white/10 pt-6">
        <LastVerifiedBadge contentType="Guide" contentId={guide._id} lastVerified={guide.lastVerified} />
      </div>
    </motion.article>
  );
}
