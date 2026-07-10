import { Link } from "react-router-dom";

export default function BackToHomeLink({ className = "" }) {
  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-1.5 text-sm font-medium text-brand-300 hover:text-brand-200 ${className}`}
    >
      <span aria-hidden="true">←</span> Back to home
    </Link>
  );
}
