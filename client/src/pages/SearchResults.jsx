import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import apiClient from "../api/client.js";
import SearchBar from "../components/SearchBar.jsx";
import GuideCard from "../components/cards/GuideCard.jsx";
import NeighbourhoodCard from "../components/cards/NeighbourhoodCard.jsx";
import NewsCard from "../components/cards/NewsCard.jsx";
import SubmissionCard from "../components/cards/SubmissionCard.jsx";
import BackToHomeLink from "../components/BackToHomeLink.jsx";
import { staggerContainer, fadeInUp } from "../utils/motionConfig.js";

const EMPTY = { guides: [], neighbourhoods: [], news: [], submissions: [] };

export default function SearchResults() {
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const [results, setResults] = useState(EMPTY);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q) {
      setResults(EMPTY);
      return;
    }
    setLoading(true);
    apiClient
      .get("/search", { params: { q } })
      .then((res) => setResults(res.data))
      .finally(() => setLoading(false));
  }, [q]);

  const totalResults = results.guides.length + results.neighbourhoods.length + results.news.length + results.submissions.length;

  return (
    <div className="container-page py-12">
      <BackToHomeLink />
      <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Search</h1>
      <div className="mt-6">
        <SearchBar initialValue={q} />
      </div>

      {q && (
        <p className="mt-6 text-slate-400">
          {loading ? "Searching…" : `${totalResults} result${totalResults === 1 ? "" : "s"} for "${q}"`}
        </p>
      )}

      {!loading && q && totalResults === 0 && (
        <p className="mt-10 text-slate-400">No matches. Try a different term, like "IRP", "Rathmines", or "Leap card".</p>
      )}

      <div className="mt-8 space-y-12">
        {results.guides.length > 0 && (
          <ResultSection title="Guides">
            {results.guides.map((g) => (
              <GuideCard key={g._id} guide={g} />
            ))}
          </ResultSection>
        )}
        {results.neighbourhoods.length > 0 && (
          <ResultSection title="Neighbourhoods">
            {results.neighbourhoods.map((n) => (
              <NeighbourhoodCard key={n._id} neighbourhood={n} />
            ))}
          </ResultSection>
        )}
        {results.news.length > 0 && (
          <ResultSection title="News">
            {results.news.map((a) => (
              <NewsCard key={a._id} article={a} />
            ))}
          </ResultSection>
        )}
        {results.submissions.length > 0 && (
          <ResultSection title="Community stories">
            {results.submissions.map((s) => (
              <SubmissionCard key={s._id} submission={s} />
            ))}
          </ResultSection>
        )}
      </div>
    </div>
  );
}

function ResultSection({ title, children }) {
  return (
    <section aria-labelledby={`${title}-heading`}>
      <h2 id={`${title}-heading`} className="text-xl font-semibold text-white">
        {title}
      </h2>
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {Array.isArray(children) &&
          children.map((child, i) => (
            <motion.div key={i} {...fadeInUp}>
              {child}
            </motion.div>
          ))}
      </motion.div>
    </section>
  );
}
