import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const LINKS = [
  { to: "/admin", label: "Overview", end: true },
  { to: "/admin/submissions", label: "Submissions" },
  { to: "/admin/feedback", label: "Feedback" },
  { to: "/admin/guides", label: "Guides" },
  { to: "/admin/neighbourhoods", label: "Neighbourhoods" },
  { to: "/admin/stories", label: "Stories" },
  { to: "/admin/corrections", label: "Corrections" },
  { to: "/admin/gallery", label: "Gallery" },
  { to: "/admin/news", label: "News" },
];

export default function AdminLayout({ title, children }) {
  const { admin, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-900/10 bg-white">
        <div className="container-page flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-bold text-slate-900">Admin</span>
            <nav aria-label="Admin" className="hidden gap-4 sm:flex">
              {LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `text-sm font-medium ${isActive ? "text-brand-600" : "text-slate-700 hover:text-slate-900"}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span>{admin?.email}</span>
            <button type="button" onClick={logout} className="rounded-md border border-slate-900/10 px-3 py-1.5 hover:bg-slate-900/5">
              Log out
            </button>
          </div>
        </div>
        <nav aria-label="Admin mobile" className="container-page flex gap-4 overflow-x-auto pb-3 sm:hidden">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `whitespace-nowrap text-sm font-medium ${isActive ? "text-brand-600" : "text-slate-700"}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <div className="container-page py-8">
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
