import { motion } from "framer-motion";
import StoryTabs from "../components/stories/StoryTabs.jsx";
import BackToHomeLink from "../components/BackToHomeLink.jsx";

export default function Stories() {
  return (
    <div className="container-page py-12">
      <BackToHomeLink />
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-on-bg mt-4 text-3xl font-bold text-slate-900 sm:text-4xl"
      >
        Stories from students who've done it
      </motion.h1>
      <p className="mt-2 max-w-2xl text-slate-500">
        Candid feedback, scannable must-dos, and personal favourites from students who've already made the move.
      </p>

      <div className="mt-10">
        <StoryTabs />
      </div>
    </div>
  );
}
