import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import apiClient from "../api/client.js";
import useCategories from "../utils/useCategories.js";
import NewsCard from "../components/cards/NewsCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";
import BackToHomeLink from "../components/BackToHomeLink.jsx";
import { staggerContainer, fadeInUp } from "../utils/motionConfig.js";

export default function News() {
  const [articles, setArticles] = useState([]);
  const [liveApiConfigured, setLiveApiConfigured] = useState(true);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const { newsCategories } = useCategories();

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("/news", { params: { category: category || undefined } })
      .then((res) => {
        setArticles(res.data.articles);
        setLiveApiConfigured(res.data.liveApiConfigured);
      })
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <div className="container-page py-12">
      <BackToHomeLink />
      <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">News & updates</h1>
      <p className="mt-2 max-w-2xl text-slate-400">
        Visa and immigration changes, housing news, employment regulation, and coverage of racism & discrimination in Ireland.
      </p>

      {!liveApiConfigured && (
        <div className="mt-4 rounded-lg border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          Live news isn't configured yet - showing cached/reference articles. An admin can add a NewsAPI key to enable live updates.
        </div>
      )}

      <div className="mt-6 flex flex-col gap-4">
        <SearchBar placeholder="Search news…" />
        <CategoryFilter categories={newsCategories} value={category} onChange={setCategory} />
      </div>

      {loading ? (
        <p className="mt-10 text-slate-400">Loading…</p>
      ) : articles.length === 0 ? (
        <p className="mt-10 text-slate-400">No articles yet for this category.</p>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {articles.map((a) => (
            <motion.div key={a._id} {...fadeInUp}>
              <NewsCard article={a} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
