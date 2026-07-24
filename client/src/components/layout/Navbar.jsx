import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import useCategories from "../../utils/useCategories.js";
import { setNavMenuOpen } from "../../utils/navMenuStore.js";

const NAV_LINKS = [
  { to: "/neighbourhoods", label: "Neighbourhoods" },
  { to: "/news", label: "News" },
  { to: "/stories", label: "Stories" },
  { to: "/gallery", label: "Gallery" },
  { to: "/community", label: "Community" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [guidesOpen, setGuidesOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { guideCategories, guideCategoryClusters } = useCategories();
  const categoryBySlug = Object.fromEntries(guideCategories.map((c) => [c.slug, c]));
  const navigate = useNavigate();
  const guidesMenuRef = useRef(null);

  useEffect(() => {
    function onClickOutside(e) {
      if (guidesMenuRef.current && !guidesMenuRef.current.contains(e.target)) {
        setGuidesOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // Pause the homepage's 3D staircase render loop while any dropdown/mobile
  // menu is open - it renders behind the menu and was making scrolling
  // through the menu glitchy on phones.
  useEffect(() => {
    setNavMenuOpen(guidesOpen || mobileOpen);
  }, [guidesOpen, mobileOpen]);

  useEffect(() => () => setNavMenuOpen(false), []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setMobileOpen(false);
    }
  };

  const linkClass = ({ isActive }) =>
    `relative px-1 py-2 text-sm font-medium transition-colors ${
      isActive ? "text-brand-600" : "text-slate-800 hover:text-brand-600"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-900/10 bg-white/90 backdrop-blur">
      <nav className="container-page flex h-16 items-center justify-between gap-4" aria-label="Primary">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <span aria-hidden="true" className="text-brand-600">🍀</span>
          IE for Students
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <div className="relative" ref={guidesMenuRef}>
            <button
              type="button"
              className="flex items-center gap-1 px-1 py-2 text-sm font-medium text-slate-800 hover:text-brand-600"
              aria-haspopup="true"
              aria-expanded={guidesOpen}
              onClick={() => setGuidesOpen((v) => !v)}
            >
              Guides
              <span aria-hidden="true">▾</span>
            </button>
            <AnimatePresence>
              {guidesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-1/2 top-full z-50 mt-2 w-[720px] max-w-[92vw] -translate-x-1/2 rounded-xl border border-slate-900/10 bg-white p-5 shadow-2xl"
                  role="menu"
                >
                  <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
                    {guideCategoryClusters.map((cluster) => (
                      <div key={cluster.label}>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{cluster.label}</p>
                        <ul className="mt-2 space-y-1">
                          {cluster.slugs.map((slug) => {
                            const cat = categoryBySlug[slug];
                            if (!cat) return null;
                            return (
                              <li key={slug} role="none">
                                <NavLink
                                  to={`/guides/${slug}`}
                                  role="menuitem"
                                  onClick={() => setGuidesOpen(false)}
                                  className="block rounded-lg px-2 py-1.5 text-sm text-slate-800 hover:bg-slate-900/5 hover:text-brand-600"
                                >
                                  {cat.label}
                                </NavLink>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <form onSubmit={handleSearch} className="hidden max-w-xs flex-1 items-center md:flex" role="search">
          <label htmlFor="nav-search" className="sr-only">
            Search the site
          </label>
          <input
            id="nav-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guides, areas, news…"
            className="w-full rounded-full border border-slate-900/10 bg-slate-900/5 px-4 py-1.5 text-sm text-slate-900 placeholder:text-slate-500 focus:border-brand-400"
          />
        </form>

        <button
          type="button"
          className="rounded-md p-2 text-slate-800 hover:bg-slate-900/5 md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span aria-hidden="true" className="block text-2xl leading-none">
            {mobileOpen ? "✕" : "☰"}
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-slate-900/10 bg-white md:hidden"
          >
            <div className="container-page flex flex-col gap-3 py-4">
              <form onSubmit={handleSearch} role="search">
                <label htmlFor="mobile-search" className="sr-only">
                  Search the site
                </label>
                <input
                  id="mobile-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search guides, areas, news…"
                  className="w-full rounded-full border border-slate-900/10 bg-slate-900/5 px-4 py-2 text-sm text-slate-900 placeholder:text-slate-500"
                />
              </form>

              {guideCategoryClusters.map((cluster) => (
                <div key={cluster.label} className="mt-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{cluster.label}</p>
                  <div className="mt-1 grid grid-cols-2 gap-1">
                    {cluster.slugs.map((slug) => {
                      const cat = categoryBySlug[slug];
                      if (!cat) return null;
                      return (
                        <NavLink
                          key={slug}
                          to={`/guides/${slug}`}
                          onClick={() => setMobileOpen(false)}
                          className="rounded-lg px-3 py-2 text-sm text-slate-800 hover:bg-slate-900/5"
                        >
                          {cat.label}
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="mt-2 flex flex-col gap-1 border-t border-slate-900/10 pt-3">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm text-slate-800 hover:bg-slate-900/5"
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
