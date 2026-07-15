import { motion } from "framer-motion";

export default function CategoryFilter({ categories, value, onChange, allLabel = "All" }) {
  const options = [{ slug: "", label: allLabel }, ...categories];

  return (
    <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt.slug;
        return (
          <button
            key={opt.slug || "all"}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(opt.slug)}
            className="relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-400"
          >
            {active && (
              <motion.span
                layoutId="category-pill"
                className="absolute inset-0 rounded-full bg-brand-500"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className={`relative z-10 ${active ? "text-slate-900" : "text-slate-700 hover:text-slate-900"}`}>
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
