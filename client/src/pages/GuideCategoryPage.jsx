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
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { guideCategories } = useCategories();

  const category = guideCategories.find((c) => c.slug === categorySlug);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("/guides", { params: { category: categorySlug } })
      .then((res) => setGuides(res.data))
      .finally(() => setLoading(false));
    apiClient
      .get("/gallery-images", { params: { category: categorySlug } })
      .then((res) => setPhotos(res.data))
      .catch(() => setPhotos([]));
  }, [categorySlug]);

  return (
    <div className="container-page py-12">
      <BackToHomeLink />
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl"
      >
        {category?.label || "Guides"}
      </motion.h1>
      <p className="mt-2 max-w-2xl text-slate-500">
        {guides.length} topic{guides.length === 1 ? "" : "s"} to help you navigate {category?.label?.toLowerCase() || "this area"}.
      </p>

      <div className="mt-6">
        <SearchBar placeholder={`Search within ${category?.label || "guides"}…`} />
      </div>

      {loading ? (
        <p className="mt-10 text-slate-500">Loading…</p>
      ) : guides.length === 0 ? (
        <p className="mt-10 text-slate-500">No topics published in this category yet.</p>
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

      {photos.length > 0 && (
        <div className="mt-12 flex gap-4 overflow-x-auto pb-2">
          {photos.map((photo) => (
            <picture key={photo._id} className="shrink-0">
              <source srcSet={photo.url} type="image/webp" />
              <img
                src={photo.fallbackUrl}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="h-64 w-96 rounded-xl border border-slate-900/10 object-cover shadow-md"
              />
            </picture>
          ))}
        </div>
      )}
    </div>
  );
}
