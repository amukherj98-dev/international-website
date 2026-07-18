import { useEffect, useRef, useState } from "react";
import apiClient from "../../api/client.js";
import usePrefersReducedMotion from "../../utils/usePrefersReducedMotion.js";

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Photos are placed at fixed vertical depths within the tall scrolling container
// the spiral already occupies - no scroll-progress math, they simply reveal
// themselves because that's where they are on the page. IntersectionObserver
// only handles the fade-in-on-reveal, which is cheap regardless of photo count.
const SPACING_VH = 80;
const START_OFFSET_VH = 55;
const INDENT_STEP = 4; // percent further out per photo, desktop only

export default function PhotoStaircase({ totalVh }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    apiClient.get("/gallery-images").then((res) => {
      const featured = res.data.filter((img) => img.isFeatured).sort((a, b) => a.order - b.order);
      const rest = shuffle(res.data.filter((img) => !img.isFeatured));
      setImages([...featured.slice(0, 1), ...rest]);
    });
  }, []);

  if (images.length === 0) return null;

  const maxPhotos = Math.max(0, Math.floor((totalVh - START_OFFSET_VH) / SPACING_VH) + 1);
  const visible = images.slice(0, maxPhotos);

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {visible.map((image, i) => (
        <PhotoStair key={image._id} image={image} index={i} top={START_OFFSET_VH + i * SPACING_VH} />
      ))}
    </div>
  );
}

function PhotoStair({ image, index, top }) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const indent = Math.min(index * INDENT_STEP, 20);
  const sideClass =
    image.side === "left"
      ? "md:left-0 md:justify-start md:pl-[var(--indent)]"
      : "md:right-0 md:justify-end md:pr-[var(--indent)]";

  useEffect(() => {
    if (reducedMotion) {
      setRevealed(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      style={{ top: `${top}vh`, "--indent": `${indent}%` }}
      className={`pointer-events-auto absolute inset-x-0 flex justify-center px-6 md:inset-x-auto md:w-1/2 ${sideClass}`}
    >
      <figure
        className={`w-full max-w-xs transition-all duration-700 ease-out ${
          revealed ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <picture>
          <source srcSet={image.url} type="image/webp" />
          <img
            src={image.fallbackUrl}
            alt={image.alt}
            loading="lazy"
            decoding="async"
            className="h-36 w-full rounded-xl border border-slate-900/10 object-cover shadow-lg shadow-black/10 md:h-auto"
          />
        </picture>
        {image.caption && <figcaption className="mt-2 text-center text-xs text-slate-500 md:text-left">{image.caption}</figcaption>}
      </figure>
    </div>
  );
}
