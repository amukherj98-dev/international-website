import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <h1 className="text-3xl font-bold text-white">Page not found</h1>
      <p className="mt-2 text-slate-400">The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-6 inline-block text-brand-300 hover:text-brand-200">
        ← Back to home
      </Link>
    </div>
  );
}
