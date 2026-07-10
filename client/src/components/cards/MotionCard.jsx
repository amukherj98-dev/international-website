import { motion } from "framer-motion";
import { fadeInUp, cardHover } from "../../utils/motionConfig.js";

export default function MotionCard({ as: Component = "div", className = "", children, ...props }) {
  const MotionComponent = motion.create(Component);
  return (
    <MotionComponent
      {...fadeInUp}
      {...cardHover}
      className={`rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-lg shadow-black/20 transition-colors hover:border-brand-400/40 ${className}`}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
