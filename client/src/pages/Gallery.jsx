import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import apiClient from "../api/client.js";
import BackToHomeLink from "../components/BackToHomeLink.jsx";
import { staggerContainer, fadeInUp } from "../utils/motionConfig.js";

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get("/gallery-images")
      .then((res) => {
        const featured = res.data.filter((img) => img.isFeatured).sort((a, b) => a.order - b.order);
        const rest = shuffle(res.data.filter((img) => !img.isFeatured));
        setImages([...featured.slice(0, 1), ...rest]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container-page py-12">
      <BackToHomeLink />
      <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">Gallery</h1>
      <p className="mt-2 max-w-2xl text-slate-500">A few scenes from around Ireland, from students who've been there.</p>

      {loading ? (
        <p className="mt-10 text-slate-500">Loading…</p>
      ) : images.length === 0 ? (
        <p className="mt-10 text-slate-500">No photos yet.</p>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3"
        >
          {images.map((image) => (
            <motion.figure
              key={image._id}
              {...fadeInUp}
              className="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-slate-900/10 bg-white/80 backdrop-blur-sm shadow-lg shadow-black/10"
            >
              <picture>
                <source srcSet={image.url} type="image/webp" />
                <img src={image.fallbackUrl} alt={image.alt} loading="lazy" decoding="async" className="w-full" />
              </picture>
              {image.caption && <figcaption className="px-3 py-2 text-xs text-slate-500">{image.caption}</figcaption>}
            </motion.figure>
          ))}
        </motion.div>
      )}
    </div>
  );
}
