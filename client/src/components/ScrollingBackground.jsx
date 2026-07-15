import { motion } from "framer-motion";
import usePrefersReducedMotion from "../utils/usePrefersReducedMotion.js";

// Independently-animated, softly-edged colour blobs layered with "screen" blend mode
// over a dark base. Each blob drifts on its own loop (different path/duration), so as
// they cross paths their semi-transparent edges optically mix into new colours (pink +
// cyan -> white-hot, yellow + magenta -> orange-red, etc.) - real-time colour blending
// that continuously reforms, like a lava lamp, rather than a static image being panned.
const BLOBS = [
  { color: "#ff2fb0", size: "70vmax", path: { x: ["-10%", "30%", "-5%", "-10%"], y: ["-10%", "20%", "40%", "-10%"] }, duration: 34 },
  { color: "#ff8a1f", size: "65vmax", path: { x: ["60%", "20%", "70%", "60%"], y: ["-5%", "35%", "10%", "-5%"] }, duration: 41 },
  { color: "#ffe62f", size: "60vmax", path: { x: ["30%", "70%", "10%", "30%"], y: ["60%", "30%", "80%", "60%"] }, duration: 29 },
  { color: "#2fd9ff", size: "68vmax", path: { x: ["80%", "40%", "90%", "80%"], y: ["70%", "20%", "50%", "70%"] }, duration: 46 },
  { color: "#8a2fff", size: "62vmax", path: { x: ["10%", "50%", "-10%", "10%"], y: ["30%", "70%", "10%", "30%"] }, duration: 38 },
];

export default function ScrollingBackground() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden bg-[#150a1f]">
      {BLOBS.map((blob, i) => (
        <motion.div
          key={i}
          animate={
            reducedMotion
              ? undefined
              : {
                  left: blob.path.x,
                  top: blob.path.y,
                }
          }
          initial={{ left: blob.path.x[0], top: blob.path.y[0] }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            width: blob.size,
            height: blob.size,
            marginLeft: `calc(${blob.size} / -2)`,
            marginTop: `calc(${blob.size} / -2)`,
            borderRadius: "9999px",
            background: `radial-gradient(circle, ${blob.color} 0%, ${blob.color}cc 35%, transparent 70%)`,
            mixBlendMode: "screen",
            filter: "blur(10px)",
          }}
        />
      ))}
    </div>
  );
}
