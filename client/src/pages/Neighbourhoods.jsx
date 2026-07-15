import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import apiClient from "../api/client.js";
import NeighbourhoodCard from "../components/cards/NeighbourhoodCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";
import BackToHomeLink from "../components/BackToHomeLink.jsx";
import { staggerContainer, fadeInUp } from "../utils/motionConfig.js";

const CITIES = [
  { slug: "Dublin", label: "Dublin" },
  { slug: "Cork", label: "Cork" },
  { slug: "Galway", label: "Galway" },
  { slug: "Limerick", label: "Limerick" },
  { slug: "Waterford", label: "Waterford" },
];

export default function Neighbourhoods() {
  const [neighbourhoods, setNeighbourhoods] = useState([]);
  const [city, setCity] = useState("");
  const [sort, setSort] = useState("safety");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("/neighbourhoods", { params: { city: city || undefined, sort } })
      .then((res) => setNeighbourhoods(res.data))
      .finally(() => setLoading(false));
  }, [city, sort]);

  return (
    <div className="container-page py-12">
      <BackToHomeLink />
      <h1 className="text-on-bg mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">Neighbourhood guides</h1>
      <p className="mt-2 max-w-2xl text-slate-500">
        Compare student areas across Ireland by safety, cost of living, and transit access.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <SearchBar placeholder="Search neighbourhoods…" />
        <CategoryFilter categories={CITIES} value={city} onChange={setCity} allLabel="All cities" />
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <label htmlFor="sort-select">Sort by</label>
          <select
            id="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-md border border-slate-900/10 bg-slate-900/5 px-2 py-1 text-slate-900"
          >
            <option value="safety">Safety rating</option>
            <option value="cost">Cost of living</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="mt-10 text-slate-500">Loading…</p>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {neighbourhoods.map((n) => (
            <motion.div key={n._id} {...fadeInUp}>
              <NeighbourhoodCard neighbourhood={n} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
