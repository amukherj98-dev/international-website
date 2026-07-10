import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-900 py-10 text-sm text-slate-400">
      <div className="container-page flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} IE for Students. Independent student resource, not a government service.</p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          <Link to="/community" className="hover:text-brand-300">
            Share your experience
          </Link>
          <Link to="/admin/login" className="hover:text-brand-300">
            Admin
          </Link>
          <a href="https://www.citizensinformation.ie/" target="_blank" rel="noreferrer" className="hover:text-brand-300">
            Citizens Information
          </a>
        </nav>
      </div>
    </footer>
  );
}
