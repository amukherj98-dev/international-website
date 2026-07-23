import { useEffect, useState } from "react";
import usePrefersReducedMotion from "../utils/usePrefersReducedMotion.js";

const LOADING_MESSAGES = [
  "Digging through the guides...",
  "Checking neighbourhoods and news...",
  "Almost there...",
];

export default function SearchLoadingState() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 1400);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <div aria-live="polite" aria-busy="true" className="mt-8 space-y-4">
      <p className="text-sm font-medium text-brand-600">
        {prefersReducedMotion ? "Loading results…" : LOADING_MESSAGES[messageIndex]}
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-32 rounded-2xl border border-slate-900/10 bg-slate-900/5 ${
              prefersReducedMotion ? "" : "animate-pulse"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
