import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ initialValue = "", onSearch, placeholder = "Search…", label = "Search" }) {
  const [value, setValue] = useState(initialValue);
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    if (onSearch) onSearch(q);
    else navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <form onSubmit={submit} role="search" className="flex w-full max-w-xl items-center gap-2">
      <label htmlFor="page-search" className="sr-only">
        {label}
      </label>
      <input
        id="page-search"
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-slate-900/10 bg-slate-900/5 px-5 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 focus:border-brand-400"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-400"
      >
        Search
      </button>
    </form>
  );
}
