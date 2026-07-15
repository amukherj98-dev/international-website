import { useScroll, useTransform, motion } from "framer-motion";
import usePrefersReducedMotion from "../utils/usePrefersReducedMotion.js";
import bg from "../assets/Psychedelic.jpeg";

// A single, non-tiled instance of the background image, oversized well beyond the
// viewport so it can pan/zoom/rotate hue as the user scrolls without ever revealing
// an edge. The wandering, non-linear waypoints (rather than a straight A-to-B path)
// are what give the colours their "wavy" quality, and the hue-rotate sweep is what
// makes them read as continuously blending into one another rather than just sliding.
export default function ScrollingBackground() {
  const reducedMotion = usePrefersReducedMotion();
  const { scrollY } = useScroll();

  const posX = useTransform(scrollY, [0, 900, 1800, 2700, 3600], ["35%", "65%", "45%", "20%", "55%"]);
  const posY = useTransform(scrollY, [0, 900, 1800, 2700, 3600], ["20%", "45%", "70%", "50%", "30%"]);
  const scale = useTransform(scrollY, [0, 1200, 2400, 3600], [1.35, 1.55, 1.4, 1.5]);
  const hue = useTransform(scrollY, [0, 3600], [0, 90]);
  const filter = useTransform(hue, (h) => `saturate(1.7) contrast(1.15) hue-rotate(${h}deg)`);

  return (
    <motion.div
      aria-hidden="true"
      style={
        reducedMotion
          ? {
              backgroundImage: `url(${bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              filter: "saturate(1.7) contrast(1.15)",
            }
          : {
              backgroundImage: `url(${bg})`,
              backgroundSize: "220% 220%",
              backgroundRepeat: "no-repeat",
              backgroundPositionX: posX,
              backgroundPositionY: posY,
              scale,
              filter,
            }
      }
      className="fixed inset-0 -z-10"
    />
  );
}
