import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import FeedbackBubbles from "./components/feedback/FeedbackBubbles.jsx";
import ScrollingBackground from "./components/ScrollingBackground.jsx";
import ProtectedRoute from "./components/admin/ProtectedRoute.jsx";
import { pageTransition } from "./utils/motionConfig.js";

import Home from "./pages/Home.jsx";
import GuideCategoryPage from "./pages/GuideCategoryPage.jsx";
import GuideDetail from "./pages/GuideDetail.jsx";
import Neighbourhoods from "./pages/Neighbourhoods.jsx";
import NeighbourhoodDetail from "./pages/NeighbourhoodDetail.jsx";
import News from "./pages/News.jsx";
import Community from "./pages/Community.jsx";
import Stories from "./pages/Stories.jsx";
import SearchResults from "./pages/SearchResults.jsx";
import NotFound from "./pages/NotFound.jsx";

import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminSubmissions from "./pages/admin/AdminSubmissions.jsx";
import AdminGuides from "./pages/admin/AdminGuides.jsx";
import AdminNeighbourhoods from "./pages/admin/AdminNeighbourhoods.jsx";
import AdminNews from "./pages/admin/AdminNews.jsx";
import AdminFeedback from "./pages/admin/AdminFeedback.jsx";
import AdminStories from "./pages/admin/AdminStories.jsx";
import AdminCorrections from "./pages/admin/AdminCorrections.jsx";

function AnimatedPage({ children }) {
  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageTransition}>
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-white">
        Skip to main content
      </a>
      {!isAdmin && <ScrollingBackground />}
      {!isAdmin && <Navbar />}
      <main id="main-content" className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
            <Route path="/guides/:categorySlug" element={<AnimatedPage><GuideCategoryPage /></AnimatedPage>} />
            <Route path="/guides/:categorySlug/:slug" element={<AnimatedPage><GuideDetail /></AnimatedPage>} />
            <Route path="/neighbourhoods" element={<AnimatedPage><Neighbourhoods /></AnimatedPage>} />
            <Route path="/neighbourhoods/:slug" element={<AnimatedPage><NeighbourhoodDetail /></AnimatedPage>} />
            <Route path="/news" element={<AnimatedPage><News /></AnimatedPage>} />
            <Route path="/community" element={<AnimatedPage><Community /></AnimatedPage>} />
            <Route path="/stories" element={<AnimatedPage><Stories /></AnimatedPage>} />
            <Route path="/search" element={<AnimatedPage><SearchResults /></AnimatedPage>} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/submissions" element={<AdminSubmissions />} />
              <Route path="/admin/guides" element={<AdminGuides />} />
              <Route path="/admin/neighbourhoods" element={<AdminNeighbourhoods />} />
              <Route path="/admin/news" element={<AdminNews />} />
              <Route path="/admin/feedback" element={<AdminFeedback />} />
              <Route path="/admin/stories" element={<AdminStories />} />
              <Route path="/admin/corrections" element={<AdminCorrections />} />
            </Route>

            <Route path="*" element={<AnimatedPage><NotFound /></AnimatedPage>} />
          </Routes>
        </AnimatePresence>
      </main>
      {!isAdmin && <FeedbackBubbles />}
      {!isAdmin && <Footer />}
    </div>
  );
}
