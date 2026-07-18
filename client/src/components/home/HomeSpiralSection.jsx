import { useRef } from "react";
import { Link } from "react-router-dom";
import { useScroll, useMotionValueEvent } from "framer-motion";
import SpiralScene from "../three/SpiralScene.jsx";
import TopicDock from "./TopicDock.jsx";
import PhotoStaircase from "./PhotoStaircase.jsx";

const TURNS_PER_TOPIC = 1.5;

export default function HomeSpiralSection({ topics }) {
  const containerRef = useRef(null);
  const progressRef = useRef(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    layoutEffect: false,
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;
  });

  if (!topics.length) return null;
  const n = topics.length;
  const totalRotation = n * TURNS_PER_TOPIC * Math.PI * 2;

  return (
    <section
      ref={containerRef}
      aria-label="Getting started and exploring every topic"
      style={{ height: `${n * 100}vh` }}
      className="relative overflow-hidden"
    >
      <div className="sticky top-0 z-20 h-screen w-full overflow-hidden">
        <SpiralScene progressRef={progressRef} totalRotation={totalRotation} />
        <div className="relative z-10 mx-auto h-full max-w-4xl">
          {topics.map((topic, i) => (
            <TopicDock key={topic._id} topic={topic} index={i} total={n} scrollYProgress={scrollYProgress} />
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-8 z-10 flex justify-center">
          <span className="animate-bounce text-xs font-medium uppercase tracking-widest text-slate-500">
            Scroll ↓
          </span>
        </div>
      </div>

      <PhotoStaircase totalVh={n * 100} />

      {/* Always-present, non-animated fallback content for no-JS / screen readers / reduced motion,
          visually hidden but in normal document order so nothing is scroll-gated, and every topic
          stays reachable as a real link even though the animated heading above isn't clickable. */}
      <div className="sr-only">
        {topics.map((topic) =>
          topic.to ? (
            <div key={`sr-${topic._id}`}>
              <h2>
                <Link to={topic.to}>{topic.title}</Link>
              </h2>
              <p>{topic.summary}</p>
            </div>
          ) : (
            <div key={`sr-${topic._id}`}>
              <h2>{topic.title}</h2>
              <p>{topic.summary}</p>
            </div>
          )
        )}
      </div>
    </section>
  );
}
