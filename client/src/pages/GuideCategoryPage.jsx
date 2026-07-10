import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import apiClient from "../api/client.js";
import useCategories from "../utils/useCategories.js";
import GuideCard from "../components/cards/GuideCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import BackToHomeLink from "../components/BackToHomeLink.jsx";
import { staggerContainer, fadeInUp } from "../utils/motionConfig.js";

export default function GuideCategoryPage() {
  const { categorySlug } = useParams();
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const { guideCategories } = useCategories();

  const category = guideCategories.find((c) => c.slug === categorySlug);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("/guides", { params: { category: categorySlug } })
      .then((res) => setGuides(res.data))
      .finally(() => setLoading(false));
  }, [categorySlug]);

  return (
    <div className="container-page py-12">
      <BackToHomeLink />
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 text-3xl font-bold text-white sm:text-4xl"
      >
        {category?.label || "Guides"}
      </motion.h1>
      <p className="mt-2 max-w-2xl text-slate-400">
        {guides.length} topic{guides.length === 1 ? "" : "s"} to help you navigate {category?.label?.toLowerCase() || "this area"}.
      </p>

      <div className="mt-6">
        <SearchBar placeholder={`Search within ${category?.label || "guides"}…`} />
      </div>

      {loading ? (
        <p className="mt-10 text-slate-400">Loading…</p>
      ) : guides.length === 0 ? (
        <p className="mt-10 text-slate-400">No topics published in this category yet.</p>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {guides.map((guide) => (
            <motion.div key={guide._id} {...fadeInUp}>
              <GuideCard guide={guide} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
