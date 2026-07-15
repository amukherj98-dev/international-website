import { Link } from "react-router-dom";
import { motion, useTransform } from "framer-motion";
import usePrefersReducedMotion from "../../utils/usePrefersReducedMotion.js";

export default function TopicDock({ topic, index, total, scrollYProgress }) {
  const reducedMotion = usePrefersReducedMotion();
  const start = index / total;
  const mid = (index + 0.5) / total;
  const end = (index + 1) / total;
  const fadeInEnd = start + (mid - start) * 0.6;
  const fadeOutStart = end - (end - mid) * 0.6;

  const headingOpacity = useTransform(
    scrollYProgress,
    [start, fadeInEnd, fadeOutStart, end],
    [0, 1, 1, 0]
  );
  const headingY = useTransform(scrollYProgress, [start, mid], reducedMotion ? [0, 0] : [56, 0]);
  const headingX = useTransform(
    scrollYProgress,
    [start, mid],
    reducedMotion ? [0, 0] : [index % 2 === 0 ? -36 : 36, 0]
  );

  const contentRevealEnd = mid + (end - mid) * 0.25;
  const contentFadeOutStart = mid + (end - mid) * 0.75;
  const contentOpacity = useTransform(
    scrollYProgress,
    [mid, contentRevealEnd, contentFadeOutStart, end],
    [0, 1, 1, 0]
  );
  const contentY = useTransform(scrollYProgress, [mid, contentRevealEnd], reducedMotion ? [0, 0] : [20, 0]);

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
      <motion.h2
        style={{ opacity: headingOpacity, y: headingY, x: headingX }}
        className="text-3xl font-bold text-slate-900 drop-shadow-lg sm:text-4xl"
      >
        {topic.to ? (
          <Link
            to={topic.to}
            tabIndex={-1}
            aria-hidden="true"
            className="pointer-events-auto rounded underline decoration-2 underline-offset-4 decoration-slate-900/30 transition hover:text-brand-700 hover:decoration-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-400"
          >
            {topic.title}
          </Link>
        ) : (
          topic.title
        )}
      </motion.h2>
      <motion.p
        style={{ opacity: contentOpacity, y: contentY }}
        className="mt-4 max-w-xl text-base leading-relaxed text-slate-800"
      >
        {topic.summary}
      </motion.p>
    </div>
  );
}
