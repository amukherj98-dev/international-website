import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import apiClient from "../api/client.js";
import useCategories from "../utils/useCategories.js";
import HomeSpiralSection from "../components/home/HomeSpiralSection.jsx";
import SearchBar from "../components/SearchBar.jsx";
import NewsCard from "../components/cards/NewsCard.jsx";
import SubmissionCard from "../components/cards/SubmissionCard.jsx";

export default function Home() {
  const [beforeYouLeave, setBeforeYouLeave] = useState([]);
  const [gettingStarted, setGettingStarted] = useState([]);
  const [news, setNews] = useState([]);
  const [stories, setStories] = useState([]);
  const { guideCategories } = useCategories();

  useEffect(() => {
    apiClient.get("/guides", { params: { category: "before-you-leave" } }).then((res) => {
      const sorted = [...res.data].sort((a, b) => (a.order || 0) - (b.order || 0)).slice(0, 2);
      setBeforeYouLeave(sorted.map((g) => ({ ...g, to: `/guides/${g.category}/${g.slug}` })));
    });
    apiClient.get("/guides", { params: { category: "getting-started" } }).then((res) => {
      const sorted = [...res.data].sort((a, b) => (a.order || 0) - (b.order || 0));
      setGettingStarted(sorted.map((g) => ({ ...g, to: `/guides/${g.category}/${g.slug}` })));
    });
    apiClient.get("/news").then((res) => setNews(res.data.articles.slice(0, 3)));
    apiClient.get("/submissions").then((res) => setStories(res.data.slice(0, 2)));
  }, []);

  // Pre-arrival "Before You Leave" content walks through first (chronologically first
  // in a student's journey), then "Getting Started", then every other category joins
  // the same scroll-driven spiral sequence so "explore every topic" happens within it.
  const spiralTopics = useMemo(() => {
    const categoryTopics = guideCategories
      .filter((c) => c.slug !== "getting-started" && c.slug !== "before-you-leave")
      .map((c) => ({
        _id: `category-${c.slug}`,
        title: c.label,
        summary: `Explore our ${c.label} guides.`,
        to: `/guides/${c.slug}`,
      }));
    return [...beforeYouLeave, ...gettingStarted, ...categoryTopics];
  }, [beforeYouLeave, gettingStarted, guideCategories]);

  return (
    <div>
      <section className="container-page flex flex-col items-center gap-6 py-16 text-center sm:py-24">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl text-4xl font-bold text-white sm:text-5xl"
        >
          Your guide to studying and living in Ireland
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-xl text-base text-slate-300 sm:text-lg"
        >
          Visas, accommodation, neighbourhoods, work, and real experiences from international students who've done it before you.
        </motion.p>
        <SearchBar placeholder="Search IRP, accommodation, Leap card…" />
      </section>

      <HomeSpiralSection topics={spiralTopics} />

      {news.length > 0 && (
        <section className="container-page py-16" aria-labelledby="news-teaser-heading">
          <div className="flex items-center justify-between">
            <h2 id="news-teaser-heading" className="text-2xl font-bold text-white sm:text-3xl">
              Latest news & updates
            </h2>
            <Link to="/news" className="text-sm font-semibold text-brand-300 hover:text-brand-200">
              See all →
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((article) => (
              <NewsCard key={article._id} article={article} />
            ))}
          </div>
        </section>
      )}

      {stories.length > 0 && (
        <section className="container-page py-16" aria-labelledby="stories-teaser-heading">
          <div className="flex items-center justify-between">
            <h2 id="stories-teaser-heading" className="text-2xl font-bold text-white sm:text-3xl">
              Community voices
            </h2>
            <Link to="/community" className="text-sm font-semibold text-brand-300 hover:text-brand-200">
              Read more →
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {stories.map((s) => (
              <SubmissionCard key={s._id} submission={s} />
            ))}
          </div>
        </section>
      )}

      <section className="container-page py-16 pb-24" aria-labelledby="help-us-heading">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-12 text-center sm:px-12"
        >
          <h2 id="help-us-heading" className="text-2xl font-bold text-white sm:text-3xl">
            Did we miss something?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            This site is built by and for international students. If you've spotted outdated info, a gap in a guide, or
            something you wish you'd known sooner, tell us and we'll get it added.
          </p>
          <Link
            to="/community"
            className="mt-6 inline-block rounded-full bg-brand-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-400"
          >
            Share what you know
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
